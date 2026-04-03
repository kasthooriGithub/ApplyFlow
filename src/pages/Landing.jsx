import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  Toolbar,
  AppBar,
  IconButton,
  Stack,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  BusinessCenter as BusinessCenterIcon,
  BarChart as BarChartIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import DemoVideoModal from "../components/ui/DemoVideoModal";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";


const features = [
  {
    icon: BarChartIcon,
    title: "Track Applications",
    description:
      "Keep all your job applications organized in one dashboard with real-time status updates.",
  },
  {
    icon: EventIcon,
    title: "Interview Scheduler",
    description:
      "Never miss an interview. Track dates, times, and follow-ups effortlessly.",
  },
  {
    icon: NotificationsIcon,
    title: "Smart Reminders",
    description:
      "Get notified about follow-ups, upcoming interviews, and application deadlines.",
  },
  {
    icon: CheckCircleIcon,
    title: "Status Management",
    description:
      "Mark applications as Applied, Interview, Selected, or Rejected with visual indicators.",
  },
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
          bgcolor: "background.paper",
          opacity: 0.9,
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
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  background: theme.palette.primary.main,
                }}
              >
                <BusinessCenterIcon
                  sx={{ fontSize: 18, color: "primary.contrastText" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}
              >
                ApplyFlow
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              
              <Button
                component={Link}
                to="/login"
                variant="text"
                color="inherit"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                disableElevation
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
          py: { xs: 10, md: 16 },
          background: "linear-gradient(135deg, #f3e8ff 0%, #fef2f2 100%)",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Typography
                variant="overline"
                sx={{
                  bgcolor: "rgba(212, 179, 255, 0.2)",
                  color: "secondary.main",
                  px: 2,
                  py: 0.5,
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                🚀 Your Job Search, Simplified
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  lineHeight: 1.1,
                }}
              >
                Track Every Application.{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Land Your Dream Job.
                </Box>
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 400, opacity: 0.8, maxWidth: 600 }}
              >
                ApplyFlow helps students and job seekers organize applications,
                schedule interviews, and never miss a follow-up — all in one
                beautiful dashboard.
              </Typography>
              <Stack spacing={2} alignItems="center">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ py: 1.5, px: 4 }}
                  >
                    Start Tracking Free
                  </Button>
                  <Button
                    onClick={() => setShowDemoModal(true)}
                    variant="contained"
                    size="large"
                    startIcon={<PlayCircleOutlineIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
                      },
                    }}
                  >
                    Watch Demo
                  </Button>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500, opacity: 0.8 }}
                >
                  Preview how ApplyFlow works. This demo is view-only.
                </Typography>
              </Stack>

              <DemoVideoModal
                open={showDemoModal}
                onClose={() => setShowDemoModal(false)}
              />
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Features */}
      <Container sx={{ py: 12 }}>
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Everything You Need
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Powerful tools to manage your entire job search workflow.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      mb: 3,
                    }}
                  >
                    <f.icon fontSize="large" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {f.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="body2" color="text.secondary">
            © 2024 ApplyFlow. Built for job seekers, by job seekers.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;

