import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  useTheme as useMuiTheme,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  GridView as GridViewIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import NotificationDropdown from "./NotificationDropdown";

const Topbar = ({ onMenuToggle, followUpCount = 0 }) => {
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleProfile = () => {
    handleClose();
    navigate("/settings");
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        position: { xs: "fixed", md: "sticky" },
        top: 0,
        left: 0,
        right: 0,
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        zIndex: theme.zIndex.appBar,
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar sx={{ height: 64, px: { xs: 2, md: 3 } }}>
        <IconButton
          edge="start"
          onClick={onMenuToggle}
          sx={{
            mr: 2,
            display: { md: "none" },
            bgcolor: "action.hover",
            "&:hover": { bgcolor: "action.selected" }
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
          <IconButton size="small" sx={{ bgcolor: "rgba(0,0,0,0.03)", borderRadius: 2, p: 1 }}>
            <GridViewIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: "text.secondary", fontSize: "0.9rem" }}>
              ApplyFlow
            </Typography>
            <Typography variant="body2" sx={{ color: "text.disabled", fontWeight: 300, mx: 0.2 }}>
              /
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.9rem" }}>
              Dashboard
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>

          <NotificationDropdown />

          <Divider orientation="vertical" flexItem sx={{ my: 1.5, borderColor: "divider", mx: 0.5 }} />

          <Box
            onClick={handleMenu}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              p: 0.5,
              pr: 1,
              borderRadius: 2,
              transition: "background-color 0.2s",
              "&:hover": { bgcolor: "action.hover" }
            }}
          >
            <Avatar
              // src={user?.photoURL || "https://i.pravatar.cc/150?u=alex"}
              sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: "1rem", fontWeight: 700 }}
            >
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "A"}
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.2 }}>
                {user?.displayName || "Alex Rivera"}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                Pro Plan
              </Typography>
            </Box>
            <KeyboardArrowDownIcon sx={{ color: "text.secondary", fontSize: 20, display: { xs: "none", sm: "block" } }} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{
              "& .MuiPaper-root": {
                width: 240,
                mt: 1.5,
                borderRadius: 3,
                boxShadow: "0 10px 30px -5px rgba(0,0,0,0.15)",
                border: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                {user?.displayName || "Guest"}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500, wordBreak: "break-all" }}>
                {user?.email || "No email provided"}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleProfile} sx={{ py: 1 }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ fontSize: "0.85rem", fontWeight: 700 }}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ py: 1, color: "error.main" }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Log Out"
                primaryTypographyProps={{ fontSize: "0.85rem", fontWeight: 700 }}
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


export default Topbar;

