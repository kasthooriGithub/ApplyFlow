import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Switch,
  Select,
  MenuItem,
  TextField,
  Divider,
  Stack,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsBrightnessOutlined,
  PersonOutline,
  NotificationsNoneOutlined,
  WbSunnyOutlined,
  AccessTime,
  ShieldOutlined,
  LogoutOutlined,
  SettingsOutlined,
  OpenInNew,
  EventOutlined,
} from '@mui/icons-material';
import {
  signOut,
  updateProfile,
  updateEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useUserSettings, DEFAULT_SETTINGS } from '@/contexts/UserSettingsContext';
import { auth } from '@/lib/firebase';

const Settings = () => {
  const { user } = useAuth();
  const { mode, setMode } = useThemeContext();
  const { settings, updateSettings } = useUserSettings();
  const navigate = useNavigate();

  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [loadingLogout, setLoadingLogout] = React.useState(false);

  const [editOpen, setEditOpen] = React.useState(false);
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const notif = settings?.notifications || DEFAULT_SETTINGS.notifications;

  React.useEffect(() => {
    setFullName(user?.displayName || '');
    setEmail(user?.email || '');
  }, [user]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      severity,
      message,
    });
  };

  const closeSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleThemeChange = (_, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
      showSnackbar('Theme updated successfully');
    }
  };

  const updateNotifSetting = (pathOptions, successMessage = 'Notification preferences saved') => {
    updateSettings({
      notifications: {
        ...notif,
        ...pathOptions,
      },
    });
    showSnackbar(successMessage);
  };

  const updateNestedNotif = (key, nestedMerge, successMessage = 'Notification preferences saved') => {
    updateSettings({
      notifications: {
        ...notif,
        [key]: {
          ...notif[key],
          ...nestedMerge,
        },
      },
    });
    showSnackbar(successMessage);
  };

  const confirmLogout = async () => {
    try {
      setLoadingLogout(true);
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      showSnackbar('Failed to sign out. Please try again.', 'error');
    } finally {
      setLoadingLogout(false);
      setLogoutOpen(false);
    }
  };

  const openEditDialog = () => {
    setFullName(user?.displayName || '');
    setEmail(user?.email || '');
    setNameError('');
    setEmailError('');
    setEditOpen(true);
  };

  const closeEditDialog = () => {
    if (savingProfile) return;
    setEditOpen(false);
    setNameError('');
    setEmailError('');
  };

  const validateProfileForm = () => {
    let valid = true;
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    setNameError('');
    setEmailError('');

    if (!trimmedName) {
      setNameError('Name is required');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError('Enter a valid email address');
      valid = false;
    }

    return valid;
  };

  const handleSaveProfile = async () => {
    if (!user) {
      showSnackbar('User not found', 'error');
      return;
    }

    if (!validateProfileForm()) return;

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    try {
      setSavingProfile(true);

      if (trimmedName !== (user.displayName || '')) {
        await updateProfile(user, { displayName: trimmedName });
      }

      if (trimmedEmail !== (user.email || '')) {
        await updateEmail(user, trimmedEmail);
      }

      setEditOpen(false);
      showSnackbar('Profile updated successfully');
    } catch (error) {
      console.error('Profile update failed:', error);

      if (
        error?.code === 'auth/requires-recent-login' ||
        error?.code === 'auth/credential-too-old-login-again'
      ) {
        showSnackbar(
          'For security reasons, please sign in again before changing your email address.',
          'error'
        );
      } else if (error?.code === 'auth/email-already-in-use') {
        showSnackbar('This email address is already in use.', 'error');
      } else if (error?.code === 'auth/invalid-email') {
        showSnackbar('Invalid email address.', 'error');
      } else {
        showSnackbar('Failed to update profile. Please try again.', 'error');
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const cardStyle = {
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
  };

  return (
    <Box
      sx={{
        maxWidth: 1180,
        mx: 'auto',
        p: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 8, sm: 6 },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: -1 }}>
            Settings
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            Manage your account and app preferences.
          </Typography>
        </Box>
      </Box>

      {/* 2 COLUMN LAYOUT */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(320px, 460px) minmax(420px, 1fr)',
          },
          gap: 3,
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN */}
        <Stack spacing={3}>
          {/* ACCOUNT PROFILE */}
          <Card sx={cardStyle} elevation={0}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonOutline fontSize="small" color="action" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Account Profile
                </Typography>
              </Box>

              <Box
                sx={{
                  px: 2.5,
                  pb: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, minWidth: 0 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#4caf50',
                        border: '2px solid white',
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
                      },
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 56, 
                        height: 56, 
                        bgcolor: 'primary.main', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        fontSize: '1.25rem',
                        fontWeight: 700
                      }}
                    >
                      {user?.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : <PersonOutline />}
                    </Avatar>
                  </Badge>
 
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                      {user?.displayName || 'User Name'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5, fontWeight: 500 }}>
                      {user?.email || 'No email provided'}
                    </Typography>
                  </Box>
                </Box>
 
                <Button
                  variant="contained"
                  disableElevation
                  size="small"
                  onClick={openEditDialog}
                  sx={{
                    borderRadius: "10px",
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    textTransform: 'none',
                    fontWeight: 700,
                    px: 3,
                    py: 1,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  bgcolor: 'background.default',
                  gap: 1.5,
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShieldOutlined fontSize="small" sx={{ color: 'text.secondary', width: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    Two-factor authentication enabled
                  </Typography>
                </Box>

                <Button
                  variant="text"
                  color="inherit"
                  size="small"
                  onClick={() => setLogoutOpen(true)}
                  sx={{
                    textTransform: 'none',
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    p: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: 'error.main',
                    },
                  }}
                >
                  <LogoutOutlined sx={{ width: 14 }} />
                  Sign out
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* APPEARANCE */}
          <Card sx={cardStyle} elevation={0}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <WbSunnyOutlined fontSize="small" color="action" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Appearance
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Customize how ApplyFlow looks on your device.
              </Typography>

              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleThemeChange}
                fullWidth
                size="small"
                sx={{
                  p: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  bgcolor: 'rgba(0,0,0,0.02)',
                }}
              >
                <ToggleButton
                  value="light"
                  sx={{
                    textTransform: 'none',
                    py: 1,
                    borderRadius: "12px !important",
                    border: "none !important",
                    flex: 1,
                    color: 'text.secondary',
                    fontWeight: 700,
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'background.paper' }
                    },
                  }}
                >
                  <LightModeOutlined sx={{ mr: 1, fontSize: 20 }} />
                  Light
                </ToggleButton>
 
                <ToggleButton
                  value="dark"
                  sx={{
                    textTransform: 'none',
                    py: 1,
                    borderRadius: "12px !important",
                    border: "none !important",
                    flex: 1,
                    color: 'text.secondary',
                    fontWeight: 700,
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'background.paper' }
                    },
                  }}
                >
                  <DarkModeOutlined sx={{ mr: 1, fontSize: 20 }} />
                  Dark
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>

          {/* HELP CARD */}
          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border: 'none',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              boxShadow: '0 10px 30px rgba(79, 70, 229, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Need help?
              </Typography>
              <Typography variant="body2" sx={{ mb: 2.5, opacity: 0.9 }}>
                Check our documentation for advanced settings and usage guides.
              </Typography>
              <Button
                variant="contained"
                disableElevation
                startIcon={<OpenInNew sx={{ width: 14 }} />}
                sx={{
                  bgcolor: 'rgba(255,255,255,1)',
                  color: 'primary.main',
                  borderRadius: "10px",
                  textTransform: 'none',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  px: 2.5,
                  py: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                }}
              >
                View Documentation
              </Button>
            </CardContent>
          </Card>
        </Stack>

        {/* RIGHT COLUMN */}
        <Stack spacing={3}>
          {/* NOTIFICATIONS */}
          <Card sx={cardStyle} elevation={0}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <NotificationsNoneOutlined fontSize="small" color="action" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Notifications
                </Typography>
              </Box>

              <Stack spacing={4}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Interview Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Alerts ahead of scheduled interviews
                    </Typography>
                  </Box>
                  <Switch
                    checked={notif.interview?.enabled ?? true}
                    onChange={(e) =>
                      updateNestedNotif(
                        'interview',
                        { enabled: e.target.checked },
                        'Interview notification setting saved'
                      )
                    }
                    color="primary"
                    sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' } }}
                  />
                </Box>
 
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Follow-up Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Reminders for un-responded applications
                    </Typography>
                  </Box>
                  <Switch
                    checked={notif.followUp?.enabled ?? true}
                    onChange={(e) =>
                      updateNestedNotif(
                        'followUp',
                        { enabled: e.target.checked },
                        'Follow-up notification setting saved'
                      )
                    }
                    color="primary"
                    sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' } }}
                  />
                </Box>
 
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Status Change Alerts
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Real-time alerts when stage modifies
                    </Typography>
                  </Box>
                  <Switch
                    checked={notif.statusChange ?? true}
                    onChange={(e) =>
                      updateNotifSetting(
                        { statusChange: e.target.checked },
                        'Status alert preference saved'
                      )
                    }
                    color="primary"
                    sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' } }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* REMINDER SETTINGS */}
          <Card sx={cardStyle} elevation={0}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AccessTime fontSize="small" color="action" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Reminder Settings
                </Typography>
              </Box>

              <Box sx={{ px: 2.5, pb: 3 }}>
                <Stack spacing={2.5}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Interview Timing
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Select
                        size="small"
                        value={notif.interview?.timing ?? '1d'}
                        onChange={(e) =>
                          updateNestedNotif(
                            'interview',
                            { timing: e.target.value },
                            'Interview reminder timing saved'
                          )
                        }
                        sx={{
                          minWidth: 170,
                          height: 36,
                          fontSize: '0.875rem',
                          borderRadius: 2,
                        }}
                      >
                        <MenuItem value="1h">1 hour before</MenuItem>
                        <MenuItem value="1d">1 day before</MenuItem>
                        <MenuItem value="custom">Custom (days)</MenuItem>
                      </Select>

                      {notif.interview?.timing === 'custom' && (
                        <TextField
                          size="small"
                          type="number"
                          value={notif.interview?.customTiming || 1}
                          onChange={(e) =>
                            updateNestedNotif(
                              'interview',
                              { customTiming: Number(e.target.value) },
                              'Interview custom reminder saved'
                            )
                          }
                          inputProps={{ min: 1 }}
                          sx={{
                            width: 72,
                            '& .MuiInputBase-root': {
                              height: 36,
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Follow-up Timing
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Select
                        size="small"
                        value={notif.followUp?.timing ?? '3d'}
                        onChange={(e) =>
                          updateNestedNotif(
                            'followUp',
                            { timing: e.target.value },
                            'Follow-up reminder timing saved'
                          )
                        }
                        sx={{
                          minWidth: 170,
                          height: 36,
                          fontSize: '0.875rem',
                          borderRadius: 2,
                        }}
                      >
                        <MenuItem value="2d">2 days after</MenuItem>
                        <MenuItem value="3d">3 days after</MenuItem>
                        <MenuItem value="5d">5 days after</MenuItem>
                        <MenuItem value="custom">Custom (days)</MenuItem>
                      </Select>

                      {notif.followUp?.timing === 'custom' && (
                        <TextField
                          size="small"
                          type="number"
                          value={notif.followUp?.customTiming || 3}
                          onChange={(e) =>
                            updateNestedNotif(
                              'followUp',
                              { customTiming: Number(e.target.value) },
                              'Follow-up custom reminder saved'
                            )
                          }
                          inputProps={{ min: 1 }}
                          sx={{
                            width: 72,
                            '& .MuiInputBase-root': {
                              height: 36,
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Box
                sx={{
                  m: 2.5,
                  p: 2,
                  mt: 0,
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <EventOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Next reminder tracks your closest application deadline seamlessly.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          mt: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          pt: 3,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          APPLYFLOW V2.4.0
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: '#4caf50',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            SYSTEM STATUS: OPERATIONAL
          </Typography>
        </Box>
      </Box>

      {/* SIGN OUT CONFIRMATION DIALOG */}
      <Dialog
        open={logoutOpen}
        onClose={() => !loadingLogout && setLogoutOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Confirm Sign Out
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to sign out from your account?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setLogoutOpen(false)}
            disabled={loadingLogout}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>

          <Button
            onClick={confirmLogout}
            variant="contained"
            color="error"
            disabled={loadingLogout}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            {loadingLogout ? 'Signing out...' : 'Sign out'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT PROFILE DIALOG */}
      <Dialog
        open={editOpen}
        onClose={closeEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Edit Profile
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Full Name"
              fullWidth
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (nameError) setNameError('');
              }}
              error={Boolean(nameError)}
              helperText={nameError}
              disabled={savingProfile}
            />

            <TextField
              label="Email Address"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              error={Boolean(emailError)}
              helperText={
                emailError ||
                'Changing email may require recent login for security.'
              }
              disabled={savingProfile}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={closeEditDialog}
            disabled={savingProfile}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSaveProfile}
            variant="contained"
            disabled={savingProfile}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* GLOBAL SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;