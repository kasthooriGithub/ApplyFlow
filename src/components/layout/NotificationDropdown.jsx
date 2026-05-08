import React, { useState, useMemo, useEffect } from 'react';
import { useApplications } from '@/hooks/useApplications';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Button,
  Badge,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Event as EventIcon,
  WorkOutline as WorkOutlineIcon,
  NotificationsActive as ReminderIcon,
  MailOutline as MailIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';


const getIcon = (type, color) => {
  switch (type) {
    case 'interview':
      return <EventIcon sx={{ color }} />;
    case 'update':
      return <WorkOutlineIcon sx={{ color }} />;
    case 'reminder':
      return <ReminderIcon sx={{ color }} />;
    case 'message':
      return <MailIcon sx={{ color }} />;
    default:
      return <NotificationsIcon sx={{ color }} />;
  }
};

const NotificationDropdown = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const { applications } = useApplications();
  const [readIds, setReadIds] = useState(() => {
    try {
      const stored = localStorage.getItem('applyflow_read_notifications');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (e) {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('applyflow_read_notifications', JSON.stringify(Array.from(readIds)));
    } catch (e) {
      console.error('Failed to save read notifications to localStorage', e);
    }
  }, [readIds]);

  // Generate real-time notifications based on user's applications
  const notifications = useMemo(() => {
    if (!applications) return [];
    
    let generated = [];

    applications.forEach(app => {
      // 1. Upcoming Interviews Notifications
      if ((app.status === 'Interview Scheduled' || app.status === 'Interview') && app.interviewDate) {
        try {
          // Check if interview is in the future
          const intDate = new Date(`${app.interviewDate}T${app.interviewTime || '00:00'}`);
          if (intDate > new Date()) {
            generated.push({
              id: `interview-${app.id}`,
              type: 'interview',
              title: 'Upcoming Interview',
              description: `${app.companyName} (${app.jobRole}) - ${intDate.toLocaleString()}`,
              timestamp: app.updatedAt ? formatDistanceToNow(new Date(app.updatedAt), { addSuffix: true }) : 'Recently',
              read: readIds.has(`interview-${app.id}`),
              color: '#4caf50',
              sortTime: new Date(app.updatedAt || app.createdAt || 0).getTime(),
            });
          }
        } catch(e) {}
      }

      // 2. Priority Reminders
      if (app.isPriority) {
          generated.push({
            id: `priority-${app.id}`,
            type: 'reminder',
            title: 'Priority Application',
            description: `Don't forget to follow up: ${app.companyName} (${app.jobRole})`,
            timestamp: app.updatedAt ? formatDistanceToNow(new Date(app.updatedAt), { addSuffix: true }) : 'Recently',
            read: readIds.has(`priority-${app.id}`),
            color: '#ff9800',
            sortTime: new Date(app.updatedAt || app.createdAt || 0).getTime(),
          });
      }
    });

    // Deduplicate and sort by most recently updated
    return generated
      .sort((a, b) => b.sortTime - a.sortTime)
      .slice(0, 10); // Limit to top 10

  }, [applications, readIds]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAllAsRead = () => {
    setReadIds(new Set(notifications.map(n => n.id)));
  };

  const markAsRead = (id) => {
    setReadIds(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          onClick={handleClick}
          sx={{
            bgcolor: open ? 'action.selected' : 'action.hover',
            '&:hover': { bgcolor: 'action.selected' },
            transition: 'background-color 0.2s ease',
          }}
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontWeight: 800,
                fontSize: '0.6rem',
                minWidth: 16,
                height: 16,
              },
            }}
          >
            <NotificationsIcon size={20} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          '& .MuiPaper-root': {
            width: { xs: '100%', sm: 380 }, // Full width on mobile
            maxWidth: '100%',
            mt: 1.5,
            borderRadius: { xs: 0, sm: 4 },
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
            border: '1px solid',
            borderColor: 'divider',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        TransitionProps={{ timeout: 300 }} // Smooth fade + slide is default MUI behavior, can be tweaked further if needed
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            bgcolor: 'background.paper',
            zIndex: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
            Notifications
          </Typography>
          <Button
            size="small"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            sx={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            Mark all as read
          </Button>
        </Box>

        {/* List */}
        <Box sx={{ overflowY: 'auto', maxHeight: 400 }}>
          {notifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No notifications right now.
              </Typography>
            </Box>
          ) : (
            notifications.map((notif, index) => (
              <Box key={notif.id}>
                <MenuItem
                  onClick={() => markAsRead(notif.id)}
                  sx={{
                    px: 2,
                    py: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    whiteSpace: 'normal',
                    bgcolor: notif.read ? 'transparent' : 'action.hover',
                    '&:hover': {
                      bgcolor: notif.read ? 'action.hover' : 'action.selected',
                    },
                    transition: 'background-color 0.2s',
                  }}
                >
                  {/* Icon Container */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 40,
                      height: 40,
                      borderRadius: '12px',
                      bgcolor: `${notif.color}15`, // 15% opacity background
                      mt: 0.5,
                    }}
                  >
                    {getIcon(notif.type, notif.color)}
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: notif.read ? 600 : 700,
                          color: 'text.primary',
                        }}
                      >
                        {notif.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', fontWeight: 500 }}
                        >
                          {notif.timestamp}
                        </Typography>
                        {!notif.read && (
                          <CircleIcon
                            sx={{ color: 'primary.main', fontSize: 10 }}
                          />
                        )}
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.4,
                      }}
                    >
                      {notif.description}
                    </Typography>
                  </Box>
                </MenuItem>
                {index < notifications.length - 1 && (
                  <Divider sx={{ mx: 2, my: 0 }} />
                )}
              </Box>
            ))
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            bottom: 0,
            bgcolor: 'background.paper',
            textAlign: 'center',
          }}
        >
          <Button
            variant="text"
            fullWidth
            sx={{ fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            View all notifications
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationDropdown;
