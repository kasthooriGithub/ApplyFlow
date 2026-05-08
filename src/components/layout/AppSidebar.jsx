import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  AddCircle as AddCircleIcon,
  BusinessCenter as BusinessCenterIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  CalendarMonth as CalendarMonthIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import ScheduleInterviewModal from "../ui/ScheduleInterviewModal";

const navItems = [
  { label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { label: "Applications", icon: DescriptionIcon, path: "/applications" },
  { label: "Calendar", icon: CalendarMonthIcon, path: "/calendar" },
  { label: "Settings", icon: SettingsIcon, path: "/settings" },
];

const AppSidebar = ({ open, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    try {
      setAnchorEl(null);
      await signOut(auth);
      navigate("/login");
      if (onClose) onClose();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          component={Link}
          to="/dashboard"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1.5,
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            }}
          >
            <Typography sx={{ color: "white", fontSize: 18, fontWeight: 900 }}>
              A
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.2rem", color: "text.primary", letterSpacing: -0.5 }}>
            ApplyFlow
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Nav */}
      <Box sx={{ flexGrow: 1, py: 2, px: 1.5 }}>
        <List component="nav" disablePadding>
          {navItems.map((item) => {
            const active =
              location.pathname === item.path ||
              (item.path !== "/dashboard" &&
                location.pathname.startsWith(item.path));
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={onClose}
                  selected={active}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                      "&:hover": {
                        bgcolor: "primary.main",
                        opacity: 0.9,
                      },
                    },
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 38, color: active ? "white" : "text.secondary" }}>
                    <item.icon sx={{ fontSize: 22 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: active ? 700 : 500,
                    }}
                  />
                  {item.badge && (
                    <Box
                      sx={{
                        bgcolor: active ? "rgba(255,255,255,0.25)" : "primary.main",
                        color: "white",
                        px: 1,
                        py: 0.2,
                        borderRadius: 1.5,
                        minWidth: 24,
                        textAlign: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                      }}
                    >
                      {item.badge}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* QUICK ACTIONS */}
      <Box sx={{ px: 2, pt: 1, pb: 2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.5, mb: 1, display: "block", px: 1 }}>
          QUICK ACTIONS
        </Typography>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={() => {
            setScheduleModalOpen(true);
            if (isMobile && onClose) onClose();
          }}
          startIcon={
            <Box sx={{
              width: 20, height: 20, borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <AddIcon sx={{ fontSize: 16 }} />
            </Box>
          }
          sx={{
            justifyContent: "flex-start",
            color: "white",
            bgcolor: "#4f46e5", // Vibrant purple from reference
            borderRadius: 3,
            py: 1.2,
            px: 2,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#4338ca" }
          }}
        >
          Schedule Interview
        </Button>
      </Box>

      {/* Footer */}
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            borderRadius: 2,
            bgcolor: "action.hover",
          }}
        >
          <Avatar
            // src={user?.photoURL || "https://i.pravatar.cc/150?u=alex"}
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "A"}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "text.primary", noWrap: true, lineHeight: 1.2 }}
            >
              {user?.displayName || "Alex Rivera"}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", noWrap: true, display: "block", fontWeight: 500 }}
            >
              Pro Plan
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="small"
            onClick={handleProfileMenuOpen}
            sx={{ color: "text.secondary" }}
          >
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            sx={{
              "& .MuiPaper-root": {
                width: 200,
                borderRadius: 2,
                boxShadow: "0 10px 30px -5px rgba(0,0,0,0.15)",
                border: "1px solid",
                borderColor: "divider",
                mb: 1
              },
            }}
          >
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/settings'); }}>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: 260 },
        flexShrink: { md: 0 },
      }}
    >
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 260,
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Sidebar */
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 260,
              borderRight: "1px solid",
              borderColor: "divider",
              position: "fixed",
              height: "100vh",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}

      <ScheduleInterviewModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </Box>
  );
};

export default AppSidebar;

