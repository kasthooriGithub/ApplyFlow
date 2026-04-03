import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  BusinessCenter as BusinessCenterIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { Alert, CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            justifyContent="center"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", mb: 4 }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                color: "primary.contrastText",
              }}
            >
              <BusinessCenterIcon sx={{ fontSize: 22 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              ApplyFlow
            </Typography>
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account to continue
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)",
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ height: 48, fontWeight: 700 }}
                disableElevation
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>
            </Stack>
          </form>
          <Typography variant="body2" sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register" sx={{ fontWeight: 600 }}>
              Create one
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;

