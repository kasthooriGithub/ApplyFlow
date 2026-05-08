import React, { useState } from 'react';
import { 
  Box, Typography, Card, IconButton, Grid, Paper, Chip, 
  Dialog, DialogTitle, DialogContent, Stack, Divider
} from '@mui/material';
import { 
  ChevronLeft, ChevronRight, 
  CalendarMonth as CalendarIcon, 
  Event as EventIcon, 
  AccessTime as TimeIcon, 
  LocationOn as LocationIcon, 
  VideoCall as VideoIcon, 
  Phone as PhoneIcon,
  NotificationsActive as BellIcon
} from '@mui/icons-material';
import { useApplications } from '@/hooks/useApplications';
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  addDays, subMonths, addMonths, isSameMonth, isSameDay, 
  parseISO, isToday 
} from 'date-fns';

const Calendar = () => {
  const { applications, isLoading } = useApplications();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Extract interviews
  const interviews = (applications || []).filter(app => app.interviewDate);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      
      // Find interviews for this day
      const dayInterviews = interviews.filter(
        (interview) => {
          try {
            return isSameDay(parseISO(interview.interviewDate), cloneDay);
          } catch (e) { return false; }
        }
      );

      days.push(
        <Box 
          key={day.toString()} 
          sx={{ 
            width: '14.28%', 
            minHeight: { xs: 80, sm: 120 },
            borderRight: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: !isSameMonth(day, monthStart) ? 'action.hover' : 'background.paper',
            p: 1,
            position: 'relative',
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: isToday(day) ? 800 : 500,
              color: isToday(day) ? 'primary.main' : (!isSameMonth(day, monthStart) ? 'text.disabled' : 'text.primary'),
              mb: 1,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              bgcolor: isToday(day) ? '#EEF2FF' : 'transparent',
            }}
          >
            {formattedDate}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {dayInterviews.map((interview, idx) => (
              <Box
                key={idx}
                onClick={() => setSelectedEvent(interview)}
                sx={{
                  bgcolor: interview.interviewStatus === 'Completed' ? '#ecfdf3' : interview.interviewStatus === 'Cancelled' ? '#fef3f2' : '#eff8ff',
                  color: interview.interviewStatus === 'Completed' ? '#027a48' : interview.interviewStatus === 'Cancelled' ? '#b42318' : '#175cd3',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  cursor: 'pointer',
                  borderLeft: '2px solid',
                  borderColor: interview.interviewStatus === 'Completed' ? '#12b76a' : interview.interviewStatus === 'Cancelled' ? '#f04438' : '#2e90fa',
                  '&:hover': { opacity: 0.8 },
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', lineHeight: 1 }}>
                  {interview.interviewTime ? format(new Date(`2000-01-01T${interview.interviewTime}`), 'hh:mm a') : 'TBD'}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '10px', display: 'block', lineHeight: 1, mt: 0.3 }}>
                  {interview.companyName}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <Box key={day.toString()} sx={{ display: 'flex', width: '100%' }}>
        {days}
      </Box>
    );
    days = [];
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CalendarIcon sx={{ color: 'primary.main' }} />
            Interview Calendar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your upcoming interviews and schedules.
          </Typography>
        </Box>
      </Box>

      <Card sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none', overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {format(currentDate, 'MMMM yyyy')}
          </Typography>
          <Box>
            <IconButton onClick={prevMonth} size="small" sx={{ border: '1px solid', borderColor: 'divider', mr: 1 }}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={nextMonth} size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', width: '100%', bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Box key={day} sx={{ width: '14.28%', p: 1.5, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                {day}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {rows}
        </Box>
      </Card>

      {/* Event Details Modal */}
      <Dialog 
        open={Boolean(selectedEvent)} 
        onClose={() => setSelectedEvent(null)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selectedEvent && (
          <>
            <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Interview Details</Typography>
              <Chip 
                label={selectedEvent.interviewStatus || 'Scheduled'} 
                size="small" 
                sx={{ 
                  fontWeight: 700,
                  bgcolor: selectedEvent.interviewStatus === 'Completed' ? '#ecfdf3' : selectedEvent.interviewStatus === 'Cancelled' ? '#fef3f2' : '#eff8ff',
                  color: selectedEvent.interviewStatus === 'Completed' ? '#027a48' : selectedEvent.interviewStatus === 'Cancelled' ? '#b42318' : '#175cd3',
                }} 
              />
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>{selectedEvent.companyName}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>{selectedEvent.jobRole}</Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <EventIcon sx={{ color: 'text.secondary', mt: 0.2 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Date</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{format(parseISO(selectedEvent.interviewDate), 'EEEE, MMMM dd, yyyy')}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <TimeIcon sx={{ color: 'text.secondary', mt: 0.2 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Time</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedEvent.interviewTime ? format(new Date(`2000-01-01T${selectedEvent.interviewTime}`), 'hh:mm a') : 'TBD'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  {selectedEvent.interviewMode === 'online' || selectedEvent.interviewMode === 'video' ? <VideoIcon sx={{ color: 'text.secondary', mt: 0.2 }} /> :
                   selectedEvent.interviewMode === 'phone' ? <PhoneIcon sx={{ color: 'text.secondary', mt: 0.2 }} /> :
                   <LocationIcon sx={{ color: 'text.secondary', mt: 0.2 }} />}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>{selectedEvent.interviewMode || 'Mode'}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: 'break-all' }}>
                      {selectedEvent.meetingLink || selectedEvent.location || 'No location provided'}
                    </Typography>
                  </Box>
                </Box>

                {selectedEvent.setReminder && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, bgcolor: '#fffbed', p: 1.5, borderRadius: 2, border: '1px solid #fef0c7' }}>
                    <BellIcon sx={{ color: '#d97706', mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 700, textTransform: 'uppercase' }}>Reminder Set</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#b45309' }}>
                        {selectedEvent.reminderMinutes === 1440 ? '1 day before' : `${selectedEvent.reminderMinutes} minutes before`}
                      </Typography>
                    </Box>
                  </Box>
                )}
                
                {selectedEvent.notes && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Notes</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, bgcolor: 'action.hover', p: 1.5, borderRadius: 2, mt: 0.5 }}>
                        {selectedEvent.notes}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Calendar;
