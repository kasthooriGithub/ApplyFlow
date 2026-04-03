import { useLocation, Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "action.hover",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{ fontWeight: 800, mb: 2, color: "primary.main" }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: "text.secondary" }}>
          Oops! Page not found
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          size="large"
          disableElevation
        >
          Return to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;

