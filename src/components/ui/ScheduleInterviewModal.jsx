import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
  Switch,
  Stack,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  Close as CloseIcon,
  CalendarTodayOutlined as CalendarIcon,
  BusinessCenterOutlined as CompanyIcon,
  WorkOutline as RoleIcon,
  AccessTimeOutlined as TimeIcon,
  Link as LinkIcon,
  NotesOutlined as NotesIcon,
  NotificationsNoneOutlined as BellIcon,
  LocationOnOutlined as LocationIcon,
} from "@mui/icons-material";
import { useApplications } from "@/hooks/useApplications";
import { useNavigate } from "react-router-dom";

const FieldLabel = ({ icon: Icon, label }) => (
  <Typography
    sx={{
      fontSize: "13px",
      fontWeight: 600,
      color: "#344054",
      mb: 0.8,
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    {Icon && <Icon sx={{ fontSize: 16, color: "#98A2B3" }} />}
    {label}
  </Typography>
);

const ScheduleInterviewModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { applications, updateApplication } = useApplications();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [interviewMode, setInterviewMode] = useState("online");
  const [setReminder, setSetReminder] = useState(true);

  const [form, setForm] = useState({
    applicationId: "",
    companyName: "",
    jobRole: "",
    date: "", // Will be YYYY-MM-DD
    time: "", // Will be HH:mm
    status: "Scheduled",
    link: "",
    notes: "",
    reminderMinutes: 30,
  });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplicationChange = (e) => {
    const appId = e.target.value;
    const selectedApp = applications?.find((app) => app.id === appId);
    if (selectedApp) {
      setForm((prev) => ({
        ...prev,
        applicationId: appId,
        companyName: selectedApp.companyName || "",
        jobRole: selectedApp.jobRole || "",
      }));
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      height: 44,
      borderRadius: "10px",
      backgroundColor: "#FFFFFF",
      fontSize: "14px",
      color: "#1d2939",
      "& fieldset": {
        borderColor: "#D0D5DD",
      },
      "&:hover fieldset": {
        borderColor: "#98A2B3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5B4DFF",
        borderWidth: "1.5px",
      },
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "#98A2B3",
      opacity: 1,
    },
  };

  const multilineSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#FFFFFF",
      fontSize: "14px",
      alignItems: "flex-start",
      "& fieldset": {
        borderColor: "#D0D5DD",
      },
      "&:hover fieldset": {
        borderColor: "#98A2B3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5B4DFF",
        borderWidth: "1.5px",
      },
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "#98A2B3",
      opacity: 1,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.applicationId || !form.date || !form.time) return;

    setLoading(true);

    try {
      await updateApplication.mutateAsync({
        id: form.applicationId,
        status: `Interview ${form.status}`,
        interviewStatus: form.status,
        interviewDate: form.date,
        interviewTime: form.time,
        interviewMode,
        meetingLink: interviewMode !== "onsite" ? form.link : "",
        location: interviewMode === "onsite" ? form.link : "",
        notes: form.notes,
        setReminder,
        reminderMinutes: form.reminderMinutes,
      });


      setForm({
        applicationId: "",
        companyName: "",
        jobRole: "",
        date: "",
        time: "",
        status: "Scheduled",
        link: "",
        notes: "",
        reminderMinutes: 30,
      });
      setInterviewMode("online");
      setSetReminder(true);
      
      setIsSubmitted(true);
      setTimeout(() => {
        onClose?.();
        setIsSubmitted(false);
        navigate("/applications");
      }, 3000);
    } catch (error) {
      console.error("Failed to schedule interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "520px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 70px rgba(16,24,40,0.2)",
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        {/* Header */}
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            pb: 2,
            borderBottom: "1px solid #F2F4F7",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                backgroundColor: "#EEF2FF",
                color: "#5B4DFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarIcon sx={{ fontSize: 24 }} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#101828",
                  lineHeight: 1.2,
                }}
              >
                Schedule Interview
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#667085",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  mt: 0.5,
                }}
              >
                Quick Action
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "#98A2B3", mt: 0.5 }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {!isSubmitted ? (
          <>
            {/* Form Body */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                maxHeight: "500px",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#D0D5DD",
                  borderRadius: "10px",
                },
              }}
            >
              <Grid container spacing={2.5}>
                {/* Select Application */}
                <Grid size={12}>
                  <FieldLabel icon={RoleIcon} label="Select Applied Job" />
                  <FormControl fullWidth>
                    <Select
                      value={form.applicationId}
                      onChange={handleApplicationChange}
                      displayEmpty
                      disabled={isSubmitted || loading}
                      sx={{
                        height: 44,
                        borderRadius: "10px",
                        backgroundColor: "#FFFFFF",
                        fontSize: "14px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D0D5DD",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#98A2B3",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#5B4DFF",
                          borderWidth: "1.5px",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em style={{ color: "#98A2B3", fontStyle: "normal" }}>Select a job you applied for...</em>
                      </MenuItem>
                      {applications?.map((app) => (
                        <MenuItem key={app.id} value={app.id}>
                          {app.companyName} - {app.jobRole}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Company & Job Role */}
                <Grid size={6}>
                  <FieldLabel icon={CompanyIcon} label="Company Name" />
                  <TextField
                    fullWidth
                    placeholder="Auto-filled"
                    disabled
                    value={form.companyName}
                    sx={inputSx}
                  />
                </Grid>
                <Grid size={6}>
                  <FieldLabel icon={RoleIcon} label="Job Role" />
                  <TextField
                    fullWidth
                    placeholder="Auto-filled"
                    disabled
                    value={form.jobRole}
                    sx={inputSx}
                  />
                </Grid>

                {/* Date & Time */}
                <Grid size={6}>
                  <FieldLabel icon={CalendarIcon} label="Date" />
                  <TextField
                    fullWidth
                    type="date"
                    disabled={isSubmitted || loading}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    sx={inputSx}
                    slotProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarIcon sx={{ fontSize: 18, color: "#101828" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <FieldLabel icon={TimeIcon} label="Time" />
                  <TextField
                    fullWidth
                    type="time"
                    disabled={isSubmitted || loading}
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    sx={inputSx}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <TimeIcon sx={{ fontSize: 18, color: "#101828" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Interview Mode */}
                <Grid size={12}>
                  <FieldLabel icon={LocationIcon} label="Interview Type" />
                  <ToggleButtonGroup
                    value={interviewMode}
                    exclusive
                    fullWidth
                    disabled={isSubmitted || loading}
                    onChange={(e, value) => value && setInterviewMode(value)}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 1.5,
                      "& .MuiToggleButton-root": {
                        border: "1.5px solid #F2F4F7 !important",
                        borderRadius: "10px !important",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#344054",
                        backgroundColor: "#FFFFFF",
                        height: 42,
                        "&:hover": {
                          backgroundColor: "#F9FAFB",
                        },
                      },
                      "& .Mui-selected": {
                        borderColor: "#5B4DFF !important",
                        color: "#101828 !important",
                        backgroundColor: "#FFFFFF !important",
                        boxShadow: "0 2px 4px rgba(91,77,255,0.05)",
                      },
                    }}
                  >
                    <ToggleButton value="online">Online</ToggleButton>
                    <ToggleButton value="onsite">Onsite</ToggleButton>
                    <ToggleButton value="phone">Phone</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {/* Status */}
                <Grid size={12}>
                  <FieldLabel icon={NotesIcon} label="Status" />
                  <ToggleButtonGroup
                    value={form.status}
                    exclusive
                    fullWidth
                    disabled={isSubmitted || loading}
                    onChange={(e, value) => value && update("status", value)}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 1.5,
                      "& .MuiToggleButton-root": {
                        border: "1.5px solid #F2F4F7 !important",
                        borderRadius: "10px !important",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#344054",
                        backgroundColor: "#FFFFFF",
                        height: 42,
                        "&:hover": {
                          backgroundColor: "#F9FAFB",
                        },
                      },
                      "& .Mui-selected": {
                        borderColor: "#5B4DFF !important",
                        color: "#101828 !important",
                        backgroundColor: "#FFFFFF !important",
                        boxShadow: "0 2px 4px rgba(91,77,255,0.05)",
                      },
                    }}
                  >
                    <ToggleButton value="Scheduled">Scheduled</ToggleButton>
                    <ToggleButton value="Completed">Completed</ToggleButton>
                    <ToggleButton value="Cancelled">Cancelled</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {/* Link / Address */}
                <Grid size={12}>
                  <FieldLabel icon={LocationIcon} label="Meeting Link / Address" />
                  <TextField
                    fullWidth
                    placeholder="https://zoom.us/j/..."
                    disabled={isSubmitted || loading}
                    value={form.link}
                    onChange={(e) => update("link", e.target.value)}
                    sx={inputSx}
                    slotProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon sx={{ fontSize: 18, color: "#98A2B3" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Notes */}
                <Grid size={12}>
                  <FieldLabel icon={NotesIcon} label="Notes" />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    disabled={isSubmitted || loading}
                    placeholder="Add any specific details or preparation notes..."
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    sx={multilineSx}
                  />
                </Grid>

                {/* Set Reminder Section */}
                <Grid size={12}>
                  <Box
                    sx={{
                      border: "1.5px solid #EEF2FF",
                      backgroundColor: "#F9FBFF",
                      borderRadius: "16px",
                      p: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "10px",
                            backgroundColor: "#EEF2FF",
                            color: "#5B4DFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <BellIcon sx={{ fontSize: 20 }} />
                        </Box>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: "#101828",
                              lineHeight: 1.2,
                            }}
                          >
                            Set Reminder
                          </Typography>
                          {setReminder ? (
                            <Select
                              value={form.reminderMinutes}
                              onChange={(e) => update("reminderMinutes", e.target.value)}
                              disabled={isSubmitted || loading}
                              size="small"
                              sx={{
                                mt: 0.5,
                                height: 30,
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#667085",
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                backgroundColor: "transparent",
                                pl: 0,
                                "& .MuiSelect-select": { pl: 0, py: 0 },
                              }}
                            >
                              <MenuItem value={10}>10 mins before</MenuItem>
                              <MenuItem value={30}>30 mins before</MenuItem>
                              <MenuItem value={60}>1 hr before</MenuItem>
                              <MenuItem value={1440}>1 day before</MenuItem>
                            </Select>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#667085",
                                mt: 0.4,
                              }}
                            >
                              Off
                            </Typography>
                          )}
                        </Box>
                      </Stack>

                      <Switch
                        checked={setReminder}
                        disabled={isSubmitted || loading}
                        onChange={(e) => setSetReminder(e.target.checked)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#5B4DFF",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#5B4DFF",
                            opacity: 1,
                          },
                        }}
                      />
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                borderTop: "1px solid #F2F4F7",
                px: 3,
                py: 2.5,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Button
                onClick={onClose}
                sx={{
                  textTransform: "none",
                  color: "#667085",
                  fontWeight: 600,
                  fontSize: "15px",
                  "&:hover": { backgroundColor: "transparent", color: "#101828" },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading || isSubmitted}
                variant="contained"
                sx={{
                  textTransform: "none",
                  px: 4,
                  height: 48,
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "15px",
                  backgroundColor: "#5B4DFF",
                  boxShadow: "0 8px 20px rgba(91,77,255,0.25)",
                  "&:hover": {
                    backgroundColor: "#4B3DFA",
                    boxShadow: "0 10px 25px rgba(91,77,255,0.3)",
                  },
                }}
              >
                {loading ? "Scheduling..." : isSubmitted ? "Scheduled!" : "Schedule Interview"}
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              py: 8,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#ecfdf3",
                color: "#12b76a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Typography sx={{ fontSize: 32 }}>✅</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#101828", mb: 1 }}>
              Interview Scheduled Successfully!
            </Typography>
            <Typography variant="body2" sx={{ color: "#667085" }}>
              Redirecting...
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default ScheduleInterviewModal;