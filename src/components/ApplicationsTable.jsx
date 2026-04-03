import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import StatusBadge from "./StatusBadge";

const ApplicationsTable = ({ applications, onDelete, onTogglePriority }) => (
  <TableContainer
    component={Paper}
    elevation={0}
    sx={{
      borderRadius: 4,
      border: "1px solid",
      borderColor: "divider",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    }}
  >
    <Table sx={{ minWidth: 650 }} aria-label="applications table">
      <TableHead>
        <TableRow sx={{ bgcolor: "action.hover" }}>
          <TableCell sx={{ width: 48 }}></TableCell>
          <TableCell sx={{ fontWeight: 700, py: 2 }}>Company</TableCell>
          <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
          <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
          <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
          <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
          <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applications.map((app) => (
          <TableRow
            key={app.id}
            sx={{ 
              "&:hover": { bgcolor: "action.hover" }, 
              transition: "background-color 0.2s",
              bgcolor: app.isPriority ? "warning.lighter" : "inherit"
            }}
          >
            <TableCell>
              <IconButton 
                size="small" 
                onClick={() => onTogglePriority?.(app.id)}
                sx={{ color: app.isPriority ? "warning.main" : "text.disabled" }}
              >
                {app.isPriority ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
              </IconButton>
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>{app.companyName}</TableCell>
            <TableCell sx={{ fontWeight: 500 }}>{app.jobRole}</TableCell>
            <TableCell sx={{ color: "text.secondary", fontSize: "0.875rem" }}>{app.location}</TableCell>
            <TableCell sx={{ color: "text.secondary", fontSize: "0.875rem" }}>{app.jobType}</TableCell>
            <TableCell>
              <StatusBadge status={app.status} />
            </TableCell>
            <TableCell align="right">
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                <Tooltip title="View Details">
                  <IconButton
                    component={Link}
                    to={`/applications/${app.id}`}
                    size="small"
                    color="primary"
                    sx={{ bgcolor: "primary.lighter", "&:hover": { bgcolor: "primary.light", color: "white" } }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    component={Link}
                    to={`/applications/${app.id}/edit`}
                    size="small"
                    color="primary"
                    sx={{ bgcolor: "primary.lighter", "&:hover": { bgcolor: "primary.light", color: "white" } }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => onDelete(app.id)}
                    size="small"
                    color="error"
                    sx={{ bgcolor: "error.lighter", "&:hover": { bgcolor: "error.light", color: "white" } }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ApplicationsTable;

