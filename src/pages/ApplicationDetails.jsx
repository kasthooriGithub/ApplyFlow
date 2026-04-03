import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationOnIcon,
  BusinessCenter as BusinessCenterIcon,
  Event as EventIcon,
  AttachMoney as AttachMoneyIcon,
  Launch as LaunchIcon,
  Description as DescriptionIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import StatusBadge from "@/components/StatusBadge";
import DeleteDialog from "@/components/DeleteDialog";
import { useApplications } from "@/hooks/useApplications";
import { useState, useMemo } from "react";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, deleteApplication, isLoading } = useApplications();
  const [showDelete, setShowDelete] = useState(false);
  
  const app = useMemo(() => {
    return applications.find((a) => a.id === id);
  }, [applications, id]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!app) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 20 }}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
          Application not found
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 4, borderRadius: 3, px: 4 }} 
          onClick={() => navigate("/applications")}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  const details = [
    { icon: LocationOnIcon, label: "Location", value: app.location || "Not specified" },
    { icon: BusinessCenterIcon, label: "Job Type", value: app.jobType },
    { icon: EventIcon, label: "Applied Date", value: app.appliedDate || "Not recorded" },
    { icon: EventIcon, label: "Interview Date", value: app.interviewDate || "Not scheduled" },
    { icon: AccessTimeIcon, label: "Follow-up Date", value: app.followUpDate || "Not set" },
    { icon: AttachMoneyIcon, label: "Salary", value: app.salary || "Not specified" },
  ];

  const handleDelete = async () => {
    try {
      await deleteApplication.mutateAsync(id);
      navigate("/applications");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "action.hover" }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
              {app.companyName}
            </Typography>
            {app.isPriority && (
              <Tooltip title="High Priority">
                <StarIcon color="warning" />
              </Tooltip>
            )}
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
            {app.jobRole}
          </Typography>
        </Box>
        <StatusBadge status={app.status} />
      </Stack>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          mb: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        }}
      >
        <List disablePadding>
          {details.map((d, index) => (
            <Box key={d.label}>
              <ListItem sx={{ py: 2.5, px: 3 }}>
                <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
                  <d.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                      <Typography
                        variant="body2"
                        sx={{ width: { sm: 140 }, flexShrink: 0, color: "text.secondary", fontWeight: 700, mb: { xs: 0.5, sm: 0 } }}
                      >
                        {d.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {d.value}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < details.length - 1 && <Divider />}
            </Box>
          ))}
          {(app.jobUrl || app.jobLink) && (
            <>
              <Divider />
              <ListItem sx={{ py: 2.5, px: 3 }}>
                <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
                  <LaunchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                      <Typography
                        variant="body2"
                        sx={{ width: { sm: 140 }, flexShrink: 0, color: "text.secondary", fontWeight: 700, mb: { xs: 0.5, sm: 0 } }}
                      >
                        Job URL
                      </Typography>
                      <Typography
                        variant="body2"
                        component="a"
                        href={app.jobUrl || app.jobLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontWeight: 700,
                          color: "primary.main",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {app.jobUrl || app.jobLink}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </>
          )}
        </List>
      </Paper>

      {app.notes && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            mb: 4,
            bgcolor: "action.hover",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: "primary.main" }}>
            Notes
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
            {app.notes}
          </Typography>
        </Paper>
      )}

      <Stack direction="row" spacing={2}>
        <Button
          component={Link}
          to={`/applications/${app.id}/edit`}
          variant="contained"
          startIcon={<EditIcon />}
          sx={{ px: 4, borderRadius: 3, fontWeight: 700 }}
        >
          Edit Details
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setShowDelete(true)}
          sx={{ px: 3, borderRadius: 3, fontWeight: 700 }}
        >
          Delete
        </Button>
      </Stack>

      <DeleteDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default ApplicationDetails;
