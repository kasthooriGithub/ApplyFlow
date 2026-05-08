import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Toolbar,
  AppBar,
  Stack,
  useTheme as useMuiTheme,
  Paper,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  BusinessCenter as BusinessCenterIcon,
  ArrowForward as ArrowForwardIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  WorkOutline as WorkOutlineIcon,
  EventNote as EventNoteIcon,
  CalendarMonth as CalendarMonthIcon,
  NotificationsActive as NotificationsActiveIcon,
  DonutLarge as DonutLargeIcon,
  TrendingUp as TrendingUpIcon,
  AddBox as AddBoxIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
  ShowChart as ShowChartIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import DemoVideoModal from "../components/ui/DemoVideoModal";

const features = [
  {
    icon: WorkOutlineIcon,
    title: "Job Application Tracking",
    description: "Keep all your job applications organized in one dashboard with detailed information and real-time status updates.",
  },
  {
    icon: EventNoteIcon,
    title: "Interview Scheduling",
    description: "Never miss an interview. Track dates, times, formats, and follow-up requirements effortlessly.",
  },
  {
    icon: CalendarMonthIcon,
    title: "Calendar View",
    description: "Visualize your interview schedule and upcoming deadlines with our intuitive calendar integration.",
  },
  {
    icon: NotificationsActiveIcon,
    title: "Reminders & Notifications",
    description: "Get smart notifications about follow-ups, upcoming interviews, and application deadlines so you're always prepared.",
  },
  {
    icon: DonutLargeIcon,
    title: "Status Management",
    description: "Effortlessly mark applications as Applied, Interviewing, Selected, or Rejected with visual status indicators.",
  },
  {
    icon: TrendingUpIcon,
    title: "Analytics & Insights",
    description: "Monitor your application success rate, response times, and overall job search progress with detailed charts.",
  },
];

const steps = [
  { icon: AddBoxIcon, title: "Add Job", description: "Quickly save jobs you've applied to with all necessary details." },
  { icon: EventIcon, title: "Schedule Interview", description: "Log your interview dates and times directly into the system." },
  { icon: NotificationsIcon, title: "Get Reminder", description: "Receive smart notifications so you're always prepared." },
  { icon: ShowChartIcon, title: "Track Progress", description: "Monitor your application status from applied to hired." },
];

const Landing = () => {
  const theme = useMuiTheme();
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box
              component={Link}
              to="/"
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
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1.5,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <BusinessCenterIcon
                  sx={{ fontSize: 20, color: "primary.contrastText" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}
              >
                ApplyFlow
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                component={Link}
                to="/login"
                variant="text"
                color="inherit"
                sx={{ 
                  display: { xs: "none", sm: "inline-flex" }, 
                  fontWeight: 600,
                  "&:hover": { color: "primary.main", bgcolor: "transparent" }
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                disableElevation
                sx={{ 
                  borderRadius: 2, 
                  fontWeight: 600, 
                  px: 3,
                  textTransform: 'none'
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero */}
      <Box
        sx={{
          pt: { xs: 12, md: 20 },
          pb: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Stack spacing={4} alignItems="center" textAlign="center" sx={{ position: 'relative', zIndex: 2 }}>
              <Chip 
                label="🚀 Your Ultimate Job Search Companion" 
                color="primary" 
                variant="outlined" 
                sx={{ 
                  fontWeight: 700, 
                  borderRadius: '16px', 
                  borderWidth: 2,
                  px: 1,
                  py: 2.5,
                  fontSize: '0.85rem'
                }} 
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "3rem", md: "4.5rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  maxWidth: "900px",
                }}
              >
                Streamline Your Job Search with{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ApplyFlow
                </Box>
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 400, opacity: 0.9, maxWidth: "700px", fontSize: { xs: "1.1rem", md: "1.3rem" }, lineHeight: 1.6 }}
              >
                Stop losing track of your applications. Manage opportunities, schedule interviews, and get smart reminders—all in one powerful dashboard designed to help you land your dream job faster.
              </Typography>
              
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 2, width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    py: 1.8, 
                    px: 4, 
                    borderRadius: 2, 
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.25)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 25px rgba(79, 70, 229, 0.35)",
                    },
                    transition: "all 0.2s"
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  onClick={() => setShowDemoModal(true)}
                  variant="outlined"
                  size="large"
                  startIcon={<PlayCircleOutlineIcon />}
                  sx={{
                    py: 1.8,
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      bgcolor: "rgba(79, 70, 229, 0.05)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s"
                  }}
                >
                  See How It Works
                </Button>
              </Stack>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Dashboard Preview Section */}
      <Box sx={{ mt: { xs: -4, md: -6 }, mb: 12, px: 2, position: 'relative', zIndex: 3 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Paper 
              elevation={24} 
              sx={{ 
                borderRadius: 4, 
                overflow: 'hidden', 
                border: '1px solid', 
                borderColor: 'divider',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
              }}
            >
              {/* Mock Browser Header */}
              <Box sx={{ bgcolor: 'grey.100', p: 1.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
              </Box>
              
              {/* Mock Dashboard Layout */}
              <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.paper' }}>
                <Grid container spacing={3}>
                  <Grid size={{xs: 12, md: 3}}>
                    <Stack spacing={2}>
                      <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: 'primary.50', borderColor: 'primary.100' }}>
                        <CardContent sx={{ py: 2 }}>
                          <Typography variant="body2" color="primary.main" fontWeight={600}>Total Applications</Typography>
                          <Typography variant="h4" fontWeight={800} sx={{ mt: 1 }}>42</Typography>
                        </CardContent>
                      </Card>
                      <Card variant="outlined" sx={{ borderRadius: 2 }}>
                        <CardContent sx={{ py: 2 }}>
                          <Typography variant="body2" color="text.secondary" fontWeight={600}>Interviews</Typography>
                          <Typography variant="h4" fontWeight={800} sx={{ mt: 1 }}>5</Typography>
                        </CardContent>
                      </Card>
                      <Card variant="outlined" sx={{ borderRadius: 2 }}>
                        <CardContent sx={{ py: 2 }}>
                          <Typography variant="body2" color="text.secondary" fontWeight={600}>Offers</Typography>
                          <Typography variant="h4" fontWeight={800} sx={{ mt: 1 }}>2</Typography>
                        </CardContent>
                      </Card>
                    </Stack>
                  </Grid>
                  
                  <Grid size={{xs: 12, md: 9}}>
                    <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
                      <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight={700}>Recent Applications</Typography>
                        <Button size="small" variant="contained" disableElevation sx={{ borderRadius: 1.5 }}>+ Add New</Button>
                      </Box>
                      <Box sx={{ p: 0 }}>
                        {[
                          { role: 'Frontend Developer', company: 'TechCorp', status: 'Interview', date: 'Today', color: 'warning' },
                          { role: 'Product Designer', company: 'CreativeSpace', status: 'Applied', date: 'Yesterday', color: 'info' },
                          { role: 'Full Stack Engineer', company: 'StartupX', status: 'Offer', date: '3 days ago', color: 'success' },
                        ].map((job, idx) => (
                          <Box key={idx} sx={{ p: 2.5, borderBottom: idx < 2 ? '1px solid' : 'none', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', '&:hover': { bgcolor: 'grey.50' } }}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: `${job.color}.light`, color: `${job.color}.dark`, fontWeight: 700 }}>
                                {job.company.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>{job.role}</Typography>
                                <Typography variant="body2" color="text.secondary">{job.company}</Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                              <Chip label={job.status} color={job.color} size="small" sx={{ fontWeight: 600, minWidth: 80 }} />
                              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, minWidth: 80, textAlign: 'right' }}>{job.date}</Typography>
                              <IconButton size="small" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 8, textAlign: "center", maxWidth: "800px", mx: "auto" }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1.5, mb: 1, display: "block" }}>
              POWERFUL FEATURES
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: "2rem", md: "2.75rem" } }}>
              Everything you need to manage your job search
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              ApplyFlow provides a comprehensive suite of tools designed to help you stay organized, prepared, and confident throughout your interview process.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ height: "100%" }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
                        borderColor: "primary.light",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 3,
                        bgcolor: "primary.50",
                        color: "primary.main",
                        mb: 3,
                      }}
                    >
                      <f.icon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                      {f.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {f.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 10, textAlign: "center", maxWidth: "800px", mx: "auto" }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1.5, mb: 1, display: "block" }}>
              SIMPLE PROCESS
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: "2rem", md: "2.75rem" } }}>
              How ApplyFlow Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Four simple steps to take control of your career journey.
            </Typography>
          </Box>
          
          <Grid container spacing={3} sx={{ position: 'relative' }}>
            {/* Connecting line for desktop */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 40, 
                left: '10%', 
                right: '10%', 
                height: 2, 
                bgcolor: 'divider',
                display: { xs: 'none', md: 'block' },
                zIndex: 0
              }} 
            />
            
            {steps.map((step, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.title} sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                >
                  <Stack alignItems="center" textAlign="center" spacing={3}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'background.paper',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                        position: 'relative',
                        "&::after": {
                          content: '""',
                          position: 'absolute',
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          top: -5,
                          right: -5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.85rem',
                          content: `"${i + 1}"`,
                        }
                      }}
                    >
                      <step.icon sx={{ fontSize: 36, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Stack>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: { xs: 10, md: 12 }, 
          bgcolor: "primary.main", 
          color: "primary.contrastText",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, left: 0, right: 0, bottom: 0, 
            opacity: 0.1,
            background: 'radial-gradient(circle at top right, #ffffff 0%, transparent 60%), radial-gradient(circle at bottom left, #ffffff 0%, transparent 60%)' 
          }} 
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2.2rem", md: "3.2rem" } }}>
              Ready to Land Your Dream Job?
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, maxWidth: "600px" }}>
              Join thousands of job seekers who are organizing their search, tracking interviews, and getting hired faster.
            </Typography>
            <Box sx={{ pt: 2 }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{ 
                  py: 2, 
                  px: 5, 
                  bgcolor: "white", 
                  color: "primary.main",
                  borderRadius: 2, 
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  "&:hover": {
                    bgcolor: "grey.100",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  },
                  transition: "all 0.2s"
                }}
              >
                Create Your Free Account
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="body1" color="text.secondary" fontWeight={500}>
            © {new Date().getFullYear()} ApplyFlow. Built for job seekers, by job seekers.
          </Typography>
        </Container>
      </Box>

      <DemoVideoModal
        open={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </Box>
  );
};

export default Landing;


