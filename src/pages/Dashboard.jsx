import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useTheme,
  Snackbar,
  Alert,
  Fade,
  CircularProgress,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Event as EventIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  ChevronRight as ChevronRightIcon,
  NotificationsActive as NotificationsActiveIcon,
  VideocamOutlined as VideocamIcon,
  BusinessOutlined as BusinessIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { useApplications } from "@/hooks/useApplications";
import { auth } from "@/lib/firebase";
import { 
  isToday, 
  isTomorrow, 
  addDays, 
  isAfter, 
  isBefore, 
  parseISO, 
  format, 
  formatDistanceToNow 
} from "date-fns";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { applications, isLoading } = useApplications();
  const user = auth.currentUser;
  
  const [reminderOpen, setReminderOpen] = useState(false);
  
  const stats = useMemo(() => {
    const total = applications.length;
    if (total === 0) return [];

    const interviews = applications.filter(a => a.status === "Interview Scheduled").length;
    const rejected = applications.filter(a => a.status === "Rejected").length;
    const selected = applications.filter(a => a.status === "Selected").length;

    return [
      { 
        title: "Total Applications", 
        value: total, 
        icon: DescriptionIcon, 
        colorClass: "text-primary",
        progress: 100,
        percentage: 100
      },
      { 
        title: "Interviews", 
        value: interviews, 
        icon: EventIcon, 
        colorClass: "text-warning",
        progress: (interviews / total) * 100,
        percentage: Math.round((interviews / total) * 100)
      },
      { 
        title: "Rejections", 
        value: rejected, 
        icon: CancelIcon, 
        colorClass: "text-destructive",
        progress: (rejected / total) * 100,
        percentage: Math.round((rejected / total) * 100)
      },
      { 
        title: "Success Rate", 
        value: selected, 
        icon: CheckCircleIcon, 
        colorClass: "text-success",
        progress: (selected / total) * 100,
        percentage: Math.round((selected / total) * 100)
      }
    ];
  }, [applications]);

  const todaysFollowUpsCount = useMemo(() => {
    return applications.filter(app => app.followUpDate && isToday(parseISO(app.followUpDate))).length;
  }, [applications]);

  useEffect(() => {
    if (todaysFollowUpsCount > 0) {
      const timer = setTimeout(() => setReminderOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [todaysFollowUpsCount]);

  const recentActivity = useMemo(() => {
    // Sort by updatedAt DESC to show truly "recent" changes
    return [...applications]
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 4);
  }, [applications]);

  const upcomingInterviews = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const threeDaysFromNow = addDays(today, 3);
    
    return applications
      .filter(app => {
        if (!app.interviewDate) return false;
        const iDate = parseISO(app.interviewDate);
        return (isToday(iDate) || isTomorrow(iDate) || (isAfter(iDate, today) && isBefore(iDate, threeDaysFromNow)));
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.interviewDate} ${a.interviewTime || '00:00'}`).getTime();
        const dateB = new Date(`${b.interviewDate} ${b.interviewTime || '00:00'}`).getTime();
        return dateA - dateB;
      })
      .slice(0, 3);
  }, [applications]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={4} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: "-0.02em" }}>
          Welcome back, {user?.displayName || user?.email?.split('@')[0] || "User"}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          You have <Box component="span" sx={{ fontWeight: 800, color: "primary.main" }}>{todaysFollowUpsCount}</Box> follow-ups to handle today.
        </Typography>
      </Box>

      {stats.length > 0 && (
        <Grid container spacing={3}>
          {stats.map((s, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.title}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatCard {...s} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

       <Grid container spacing={4}>
         {/* Recent Activity Section */}
         <Grid size={{ xs: 12, md: 6 }}>
           <Card
             elevation={0}
             sx={{
               height: "100%",
               borderRadius: 4,
               border: "1px solid",
               borderColor: "divider",
               display: "flex",
               flexDirection: "column"
             }}
           >
             <CardHeader
               title={
                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                   <Box sx={{ p: 1, bgcolor: "rgba(0,0,0,0.03)", borderRadius: 2, display: "flex" }}>
                     <AccessTimeIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                   </Box>
                   <Typography variant="h6" sx={{ fontWeight: 700 }}>
                     Recent Activity
                   </Typography>
                 </Box>
               }
               sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider" }}
             />
             <List disablePadding sx={{ flexGrow: 1 }}>
               {recentActivity.length === 0 ? (
                 <Box sx={{ py: 6, textAlign: "center" }}>
                   <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                     No recent activity.
                   </Typography>
                 </Box>
               ) : (
                 recentActivity.map((app, index) => (
                   <Box key={app.id}>
                     <ListItem disablePadding>
                       <ListItemButton
                         component={Link}
                         to={`/applications/${app.id}`}
                         sx={{
                           px: 3,
                           py: 2.5,
                           "&:hover": { bgcolor: "action.hover" },
                         }}
                       >
                         <Box sx={{ mr: 2, p: 1, bgcolor: "rgba(0,0,0,0.03)", borderRadius: 2, display: "flex" }}>
                           <BusinessIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                         </Box>
                         <ListItemText
                           primary={
                             <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                               {app.companyName}
                             </Typography>
                           }
                           secondary={
                             <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                               {app.status === 'Applied' ? 'Application Submitted' : app.status}
                             </Typography>
                           }
                         />
                         <Box sx={{ textAlign: "right" }}>
                           <Typography variant="caption" sx={{ color: "text.disabled", display: "block", mb: 0.5, fontWeight: 700 }}>
                             {formatDistanceToNow(new Date(app.updatedAt || app.createdAt), { addSuffix: true })}
                           </Typography>
                           <StatusBadge status={app.status} />
                         </Box>
                       </ListItemButton>
                     </ListItem>
                     {index < recentActivity.length - 1 && <Divider sx={{ mx: 3 }} />}
                   </Box>
                 ))
               )}
             </List>
           </Card>
         </Grid>

         {/* Upcoming Interviews Section */}
         <Grid size={{ xs: 12, md: 6 }}>
           <Card
             elevation={0}
             sx={{
               height: "100%",
               borderRadius: 4,
               border: "1px solid",
               borderColor: "divider",
               display: "flex",
               flexDirection: "column"
             }}
           >
             <CardHeader
               title={
                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                   <Box sx={{ p: 1, bgcolor: "rgba(0,0,0,0.03)", borderRadius: 2, display: "flex" }}>
                     <EventIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                   </Box>
                   <Typography variant="h6" sx={{ fontWeight: 700 }}>
                     Upcoming Interviews
                   </Typography>
                 </Box>
               }
               sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider" }}
             />
             <List disablePadding sx={{ flexGrow: 1 }}>
               {upcomingInterviews.length === 0 ? (
                 <Box sx={{ py: 8, textAlign: "center", px: 4 }}>
                   <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                     No upcoming events in the next few days.
                   </Typography>
                 </Box>
               ) : (
                 upcomingInterviews.map((app, index) => (
                   <Box key={app.id}>
                     <ListItem disablePadding>
                       <ListItemButton
                         component={Link}
                         to={`/applications/${app.id}`}
                         sx={{
                           px: 3,
                           py: 2.5,
                           "&:hover": { bgcolor: "action.hover" },
                         }}
                       >
                         <Box sx={{ mr: 2, p: 1, bgcolor: "primary.lighter", borderRadius: 2, display: "flex" }}>
                           <VideocamIcon sx={{ fontSize: 20, color: "primary.main" }} />
                         </Box>
                         <ListItemText
                           primary={
                             <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                               {app.companyName}
                             </Typography>
                           }
                           secondary={
                             <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                               {app.jobRole}
                             </Typography>
                           }
                         />
                         <Box sx={{ textAlign: "right" }}>
                           <Typography 
                             variant="subtitle2" 
                             sx={{ 
                               color: "primary.main", 
                               fontWeight: 800, 
                               display: "block" 
                             }}
                           >
                             {isToday(parseISO(app.interviewDate)) ? 'Today' : 
                              isTomorrow(parseISO(app.interviewDate)) ? 'Tomorrow' : 
                              format(parseISO(app.interviewDate), 'EEEE')}
                           </Typography>
                           <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                             {app.interviewTime ? format(new Date(`2000-01-01T${app.interviewTime}`), 'h:mm a') : 'TBD'}
                           </Typography>
                         </Box>
                       </ListItemButton>
                     </ListItem>
                     {index < upcomingInterviews.length - 1 && <Divider sx={{ mx: 3 }} />}
                   </Box>
                 ))
               )}
             </List>
             <Box sx={{ p: 2, textAlign: "center", borderTop: "1px solid", borderColor: "divider" }}>
               <Button 
                 component={Link} 
                 to="/calendar" 
                 variant="text" 
                 size="small" 
                 sx={{ fontWeight: 700, color: "text.secondary" }}
               >
                 View full calendar
               </Button>
             </Box>
           </Card>
         </Grid>
       </Grid>

      <Snackbar
        open={reminderOpen}
        autoHideDuration={6000}
        onClose={() => setReminderOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Alert 
          onClose={() => setReminderOpen(false)} 
          severity="info" 
          variant="filled"
          icon={<NotificationsActiveIcon />}
          sx={{ 
            width: "100%", 
            borderRadius: 3,
            fontWeight: 700,
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.2)",
          }}
        >
          You have {todaysFollowUpsCount} follow-ups scheduled for today!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Dashboard;

