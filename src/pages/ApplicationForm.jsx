import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Stack,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from "@mui/icons-material";
import { useApplications } from "@/hooks/useApplications";

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, addApplication, updateApplication, isLoading } = useApplications();
  
  const isEdit = !!id && id !== "new";
  const [form, setForm] = useState({
    companyName: "",
    jobRole: "",
    location: "",
    jobType: "Full-time",
    status: "Applied",
    appliedDate: new Date().toISOString().split('T')[0],
    interviewDate: "",
    interviewTime: "",
    followUpDate: "",
    salary: "",
    jobUrl: "",
    notes: "",
    isPriority: false,
  });

  useEffect(() => {
    if (isEdit && applications.length > 0) {
      const existing = applications.find((a) => a.id === id);
      if (existing) {
        setForm({
          companyName: existing.companyName || "",
          jobRole: existing.jobRole || "",
          location: existing.location || "",
          jobType: existing.jobType || "Full-time",
          status: existing.status || "Applied",
          appliedDate: existing.appliedDate || "",
          interviewDate: existing.interviewDate || "",
          interviewTime: existing.interviewTime || "",
          followUpDate: existing.followUpDate || "",
          salary: existing.salary || "",
          jobUrl: existing.jobUrl || "",
          notes: existing.notes || "",
          isPriority: existing.isPriority || false,
        });
      }
    }
  }, [isEdit, id, applications]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateApplication.mutateAsync({ id, ...form });
      } else {
        await addApplication.mutateAsync(form);
      }
      navigate("/applications");
    } catch (error) {
      console.error("Failed to save application:", error);
    }
  };

  const update = (field, value) =>
    setForm((p) => ({ ...p, [field]: value }));

  if (isEdit && isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "action.hover" }}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
            {isEdit ? "Edit Application" : "Add Application"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {isEdit
              ? "Update the details of your application"
              : "Track a new job opportunity"}
          </Typography>
        </Box>
      </Stack>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Company Name"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              placeholder="e.g. Google"
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Job Role"
              value={form.jobRole}
              onChange={(e) => update("jobRole", e.target.value)}
              placeholder="e.g. Frontend Engineer"
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Location"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. San Francisco, CA"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="job-type-label">Job Type</InputLabel>
              <Select
                labelId="job-type-label"
                value={form.jobType}
                label="Job Type"
                onChange={(e) => update("jobType", e.target.value)}
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={form.status}
                label="Status"
                onChange={(e) => update("status", e.target.value)}
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                <MenuItem value="Selected">Selected</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Follow Up">Follow Up</MenuItem>
                <MenuItem value="Saved">Saved</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Applied Date"
              type="date"
              value={form.appliedDate}
              onChange={(e) => update("appliedDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Interview Date"
              type="date"
              value={form.interviewDate}
              onChange={(e) => update("interviewDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Interview Time"
              type="time"
              value={form.interviewTime}
              onChange={(e) => update("interviewTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Follow-up Date"
              type="date"
              value={form.followUpDate}
              onChange={(e) => update("followUpDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Salary"
              value={form.salary}
              onChange={(e) => update("salary", e.target.value)}
              placeholder="e.g. $120,000"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Job URL"
              value={form.jobUrl}
              onChange={(e) => update("jobUrl", e.target.value)}
              placeholder="https://..."
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.isPriority}
                  onChange={(e) => update("isPriority", e.target.checked)}
                  color="warning"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Mark as High Priority
                </Typography>
              }
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Any additional notes or contact info..."
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={addApplication.isPending || updateApplication.isPending ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            disabled={addApplication.isPending || updateApplication.isPending}
            sx={{ px: 4, borderRadius: 3, fontWeight: 700 }}
          >
            {isEdit ? "Update" : "Create"} Application
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="large"
            disabled={addApplication.isPending || updateApplication.isPending}
            onClick={() => navigate(-1)}
            sx={{ px: 3, borderRadius: 3, fontWeight: 700 }}
          >
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ApplicationForm;

