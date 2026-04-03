import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError("Failed to create an account.");
      }
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
        py: 4,
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
            Create your account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start tracking your job applications today
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
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
              />
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
              <TextField
                fullWidth
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ height: 48, fontWeight: 700, mt: 1 }}
                disableElevation
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
              </Button>
            </Stack>
          </form>
          <Typography variant="body2" sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;

