import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import SearchFilterBar from "@/components/SearchFilterBar";
import ApplicationsTable from "@/components/ApplicationsTable";
import ApplicationCard from "@/components/ApplicationCard";
import EmptyState from "@/components/EmptyState";
import DeleteDialog from "@/components/DeleteDialog";
import { useApplications } from "@/hooks/useApplications";
import { motion, AnimatePresence } from "framer-motion";

const Applications = () => {
  const { applications, isLoading, deleteApplication, updateApplication } = useApplications();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "" });

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.companyName.toLowerCase().includes(search.toLowerCase()) ||
        app.jobRole.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      const matchesPriority = !priorityFilter || app.isPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [applications, search, statusFilter, priorityFilter]);

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteApplication.mutateAsync(deleteId);
        setToast({ open: true, message: "Application deleted successfully" });
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleTogglePriority = async (id) => {
    const app = applications.find(a => a.id === id);
    if (app) {
      try {
        await updateApplication.mutateAsync({ id, isPriority: !app.isPriority });
      } catch (error) {
        console.error("Toggle priority failed:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={4} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: { sm: "center" },
          justifyContent: { sm: "space-between" },
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
            Applications
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {filtered.length} of {applications.length} applications
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/applications/new"
          variant="contained"
          size="large"
          startIcon={<AddCircleIcon />}
          disableElevation
          sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}
        >
          Add New
        </Button>
      </Box>

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No results found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <Box>
          {/* Desktop View */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
             <ApplicationsTable 
               applications={filtered} 
               onDelete={setDeleteId} 
               onTogglePriority={handleTogglePriority} 
             />
          </Box>
          
          {/* Mobile View */}
          <Box sx={{ display: { md: "none" }, mt: 0 }}>
            <AnimatePresence>
              {filtered.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onDelete={setDeleteId}
                  onTogglePriority={handleTogglePriority}
                />
              ))}
            </AnimatePresence>
          </Box>
        </Box>
      )}

      <DeleteDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%", borderRadius: 2, fontWeight: 600 }} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Applications;

