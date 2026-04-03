import { Box, Typography, Button, Paper } from "@mui/material";
import { Inbox as InboxIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EmptyState = ({ 
  title = "No applications yet", 
  description = "Start tracking your job applications by adding your first one." 
}) => (
  <Paper
    elevation={0}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
      border: "2px dashed",
      borderColor: "divider",
      bgcolor: "background.paper",
      py: 10,
      px: 4,
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        mb: 3,
      }}
    >
      <InboxIcon sx={{ fontSize: 32 }} />
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
      {title}
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ maxWidth: 300, mx: "auto", mb: 4 }}
    >
      {description}
    </Typography>
    <Button
      component={Link}
      to="/applications/new"
      variant="contained"
      disableElevation
    >
      Add Application
    </Button>
  </Paper>
);

export default EmptyState;

