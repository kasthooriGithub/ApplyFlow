import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';

const UserSettingsContext = createContext();

export const useUserSettings = () => useContext(UserSettingsContext);

export const DEFAULT_SETTINGS = {
  themeMode: 'system',
  notifications: {
    masterEnabled: true,
    interview: { enabled: true, timing: '1d', customTiming: 1 },
    followUp: { enabled: true, timing: '3d', customTiming: 3 },
    statusChange: true,
  }
};

export const UserSettingsProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    if (user && !authLoading) {
      const docRef = doc(db, 'user_settings', user.uid);
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setSettings({ ...DEFAULT_SETTINGS, ...docSnap.data() });
        } else {
          setSettings(DEFAULT_SETTINGS); 
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching user settings: ", error);
        setLoading(false);
      });
    } else if (!authLoading) {
      setSettings(DEFAULT_SETTINGS);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, authLoading]);

  const updateSettings = useCallback(async (newSettings) => {
    if (!user) return;
    
    setSettings(prev => ({ ...prev, ...newSettings }));
    
    try {
      const docRef = doc(db, 'user_settings', user.uid);
      await setDoc(docRef, newSettings, { merge: true });
    } catch (error) {
      console.error("Error updating settings: ", error);
    }
  }, [user]);

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings, loading }}>
        {children}
    </UserSettingsContext.Provider>
  );
};
