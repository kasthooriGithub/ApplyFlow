import { Box, Paper, Typography, useTheme, LinearProgress } from "@mui/material";

const StatCard = ({ title, value, icon: Icon, colorClass, progress, percentage }) => {
  const theme = useTheme();
  
  // Extract color from colorClass or use defaults
  const isPrimary = colorClass?.includes("primary");
  const isInfo = colorClass?.includes("info");
  const isWarning = colorClass?.includes("warning");
  const isDestructive = colorClass?.includes("destructive");
  const isSuccess = colorClass?.includes("success");
  const isAccent = colorClass?.includes("accent");

  let bgColor = theme.palette.action.hover;
  let iconColor = theme.palette.text.secondary;

  if (isPrimary) { bgColor = "rgba(212, 179, 255, 0.2)"; iconColor = theme.palette.primary.main; }
  else if (isInfo) { bgColor = "rgba(0, 184, 212, 0.1)"; iconColor = "#00b8d4"; }
  else if (isWarning) { bgColor = "rgba(255, 171, 0, 0.1)"; iconColor = "#ffab00"; }
  else if (isDestructive) { bgColor = "rgba(255, 86, 48, 0.1)"; iconColor = "#ff5630"; }
  else if (isSuccess) { bgColor = "rgba(54, 179, 126, 0.1)"; iconColor = "#36b37e"; }
  else if (isAccent) { bgColor = "rgba(124, 58, 237, 0.1)"; iconColor = "#7c3aed"; }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-4px)",
          borderColor: iconColor,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: progress !== undefined ? 2 : 0 }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.7rem" }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800 }}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            bgcolor: bgColor,
            color: iconColor,
          }}
        >
          <Icon sx={{ fontSize: 24 }} />
        </Box>
      </Box>

      {progress !== undefined && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Progress
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: iconColor }}>
              {percentage}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              '& .MuiLinearProgress-bar': {
                bgcolor: iconColor,
                borderRadius: 3,
              }
            }} 
          />
        </Box>
      )}
    </Paper>
  );
};

export default StatCard;

