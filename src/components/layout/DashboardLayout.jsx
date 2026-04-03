import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import AppSidebar from "./AppSidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";
import NotificationEngine from "./NotificationEngine";
import { useApplications } from "@/hooks/useApplications";
import { isToday, parseISO } from "date-fns";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { applications } = useApplications();

  const todaysFollowUpCount = useMemo(() => {
    return applications.filter(app => app.followUpDate && isToday(parseISO(app.followUpDate))).length;
  }, [applications]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          pb: isMobile ? 8 : 0, // Space for bottom nav
        }}
      >
        <Topbar onMenuToggle={() => setSidebarOpen(true)} followUpCount={todaysFollowUpCount} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            p: { xs: 2.5, md: 4 },
            mt: { xs: '64px', md: 0 }
          }}
        >
          <Outlet />
        </Box>
        <BottomNav />
        <NotificationEngine />
      </Box>
    </Box>
  );
};

export default DashboardLayout;

