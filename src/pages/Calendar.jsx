import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import { CalendarMonth as CalendarIcon, Event as EventIcon } from '@mui/icons-material';

const Calendar = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CalendarIcon sx={{ color: 'primary.main' }} />
          Calendar
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your interview schedule and application deadlines in one place.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 4, border: '1px border', borderColor: 'divider', boxShadow: 'none' }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
            <EventIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Full Calendar View Coming Soon!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
              We're building a powerful interactive calendar to help you never miss an interview. For now, check your upcoming dates in the Dashboard.
            </Typography>
          </Box>
          
          <Box sx={{ p: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3 }}>
              Upcoming Schedule (Mockup)
            </Typography>
            <Grid container spacing={3}>
              {[1, 2, 3].map((i) => (
                <Grid size={{ xs: 12, md: 4 }} key={i}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderStyle: 'dashed' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', display: 'block', mb: 1 }}>
                      APRIL {10 + i}, 2026
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Placeholder Interview {i}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      10:00 AM - 11:00 AM
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Calendar;
