import { Chip } from "@mui/material";
import { statusColors } from "@/data/mockData";

const StatusBadge = ({ status }) => {
  const color = statusColors[status] || "default";
  
  return (
    <Chip
      label={status}
      size="small"
      color={color === "default" ? "default" : color}
      variant={color === "default" ? "outlined" : "filled"}
      sx={{
        fontWeight: 600,
        fontSize: "0.75rem",
        height: 24,
      }}
    />
  );
};

export default StatusBadge;

