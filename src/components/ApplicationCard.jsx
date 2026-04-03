import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  Event as EventIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  InfoOutlined as InfoIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import StatusBadge from "./StatusBadge";
import { formatDistanceToNow, parseISO, differenceInDays, isAfter, startOfDay } from "date-fns";
import { motion } from "framer-motion";

const ApplicationCard = ({ application: app, onDelete, onTogglePriority }) => {
  const isAppliedLongAgo = 
    app.status === "Applied" && 
    differenceInDays(new Date(), parseISO(app.appliedDate)) > 7;

  const interviewDays = app.interviewDate 
    ? differenceInDays(startOfDay(parseISO(app.interviewDate)), startOfDay(new Date())) 
    : null;

  const getInterviewText = () => {
    if (interviewDays === 0) return "Today!";
    if (interviewDays === 1) return "Tomorrow";
    if (interviewDays > 1) return `In ${interviewDays} days`;
    if (interviewDays < 0) return `${Math.abs(interviewDays)} days ago`;
    return null;
  };

  const interviewText = getInterviewText();

  return (
    <Card
      component={motion.div}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: app.isPriority ? "warning.light" : "divider",
        bgcolor: app.isPriority ? "warning.lighter" : "background.paper",
        mb: 2,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          boxShadow: "0 12px 24px -10px rgba(0,0,0,0.1)",
          borderColor: app.isPriority ? "warning.main" : "primary.light",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 0.5, fontSize: "1.1rem" }}>
              {app.companyName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {app.jobRole}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <StatusBadge status={app.status} />
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.preventDefault();
                onTogglePriority?.(app.id);
              }}
              sx={{ 
                color: app.isPriority ? "warning.main" : "text.disabled",
                bgcolor: app.isPriority ? "warning.lighter" : "transparent",
                "&:hover": { bgcolor: "warning.lighter" }
              }}
            >
              {app.isPriority ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
            </IconButton>
          </Box>
        </Box>
        
        <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
              {app.location}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <EventIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
              {app.appliedDate}
            </Typography>
          </Box>
          <Chip 
            label={app.jobType} 
            size="small" 
            sx={{ height: 22, fontSize: "0.65rem", fontWeight: 700, bgcolor: "action.hover", borderRadius: 1.5 }} 
          />
        </Stack>

        {interviewText && (
          <Box 
            sx={{ 
              mb: 2, 
              p: 1.25, 
              borderRadius: 2, 
              bgcolor: interviewDays >= 0 ? "warning.lighter" : "action.hover",
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px dashed",
              borderColor: interviewDays >= 0 ? "warning.light" : "divider",
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 16, color: interviewDays >= 0 ? "warning.main" : "text.disabled" }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: interviewDays >= 0 ? "warning.dark" : "text.secondary" }}>
              Interview {interviewText}
            </Typography>
          </Box>
        )}

        {isAppliedLongAgo && (
          <Box 
            sx={{ 
              mb: 2, 
              p: 1.5, 
              borderRadius: 2, 
              bgcolor: "info.lighter",
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              border: "1px solid",
              borderColor: "info.light",
            }}
          >
            <InfoIcon sx={{ fontSize: 18, color: "info.main", mt: 0.2 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: "info.dark", lineHeight: 1.4 }}>
              Consider following up on this application. It's been over 7 days.
            </Typography>
          </Box>
        )}

        <Divider sx={{ mx: -3, mb: 1.5 }} />

        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Box>
            <Button
              component={Link}
              to={`/applications/${app.id}`}
              size="small"
              startIcon={<VisibilityIcon sx={{ fontSize: "1rem" }} />}
              sx={{ fontSize: "0.75rem", fontWeight: 700, borderRadius: 1.5 }}
            >
              View
            </Button>
            <Button
              component={Link}
              to={`/applications/${app.id}/edit`}
              size="small"
              startIcon={<EditIcon sx={{ fontSize: "1rem" }} />}
              sx={{ fontSize: "0.75rem", fontWeight: 700, borderRadius: 1.5 }}
            >
              Edit
            </Button>
          </Box>
          <IconButton
            onClick={() => onDelete(app.id)}
            size="small"
            color="error"
            sx={{ bgcolor: "error.lighter", "&:hover": { bgcolor: "error.light", color: "white" } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;

