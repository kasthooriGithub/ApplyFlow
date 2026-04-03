import { useNavigate, useLocation } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction, useTheme, useMediaQuery } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!isMobile) return null;

  const getActiveValue = () => {
    if (location.pathname === "/dashboard") return 0;
    if (location.pathname.startsWith("/applications") && location.pathname !== "/applications/new") return 1;
    if (location.pathname === "/applications/new") return 2;
    return 0;
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        borderTop: "1px solid",
        borderColor: "divider",
        pb: "safe-area-inset-bottom", // Support for notched phones
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={getActiveValue()}
        onChange={(event, newValue) => {
          if (newValue === 0) navigate("/dashboard");
          if (newValue === 1) navigate("/applications");
          if (newValue === 2) navigate("/applications/new");
        }}
        sx={{ height: 64 }}
      >
        <BottomNavigationAction 
          label="Dashboard" 
          icon={<DashboardIcon />} 
          sx={{ "&.Mui-selected": { color: "primary.main" } }}
        />
        <BottomNavigationAction 
          label="Apps" 
          icon={<DescriptionIcon />} 
          sx={{ "&.Mui-selected": { color: "primary.main" } }}
        />
        <BottomNavigationAction 
          label="Add" 
          icon={<AddCircleIcon />} 
          sx={{ "&.Mui-selected": { color: "primary.main" } }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
