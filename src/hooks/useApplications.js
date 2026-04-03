import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

const COLLECTION_NAME = "job_applications";

export const useApplications = () => {
  const queryClient = useQueryClient();
  const user = auth.currentUser;

  // Fetch all applications for the current user
  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ["applications", user?.uid],
    queryFn: async () => {
      if (!user) return [];
      
      const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", user.uid)
      );
      
      const snapshot = await getDocs(q);
      const apps = snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        };
      });

      // Sort client-side to avoid requiring a custom Firestore Composite Index
      return apps.sort((a, b) => {
        const dateA = a.appliedDate ? new Date(a.appliedDate).getTime() : 0;
        const dateB = b.appliedDate ? new Date(b.appliedDate).getTime() : 0;
        return dateB - dateA;
      });
    },
    enabled: !!user,
  });

  // Add a new application
  const addApplication = useMutation({
    mutationFn: async (newApp) => {
      if (!user) throw new Error("User not authenticated");
      
      const { jobUrl: extractedJobUrl, ...rest } = newApp;
      const jobUrl = extractedJobUrl || "";

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...rest,
        jobUrl,
        userId: user.uid,
        isPriority: newApp.isPriority || false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...newApp };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  // Update an application
  const updateApplication = useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const docRef = doc(db, COLLECTION_NAME, id);
      
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      return { id, ...updates };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  // Delete an application
  const deleteApplication = useMutation({
    mutationFn: async (id) => {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return {
    applications,
    isLoading,
    error,
    addApplication,
    updateApplication,
    deleteApplication,
  };
};
