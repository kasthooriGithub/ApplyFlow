import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useApplications } from '@/hooks/useApplications';
import { useUserSettings, DEFAULT_SETTINGS } from '@/contexts/UserSettingsContext';
import { isWithinInterval, addDays, addHours, parseISO, isPast } from 'date-fns';

const NotificationEngine = () => {
  const { applications, loading: appsLoading } = useApplications();
  const { settings, loading: settingsLoading } = useUserSettings();
  const [queue, setQueue] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);

  useEffect(() => {
    if (appsLoading || settingsLoading || !applications?.length) return;
    
    const notifSettings = settings?.notifications || DEFAULT_SETTINGS.notifications;
    if (!notifSettings.masterEnabled) return;

    const newAlerts = [];
    const now = new Date();

    applications.forEach((app) => {
      // INTERVIEW REMINDERS
      if (notifSettings.interview?.enabled && app.interviewDate) {
        const iDate = parseISO(app.interviewDate);
        if (!isPast(iDate)) {
          let timeframe;
          if (notifSettings.interview.timing === '1h') timeframe = addHours(now, 1);
          else if (notifSettings.interview.timing === '1d') timeframe = addDays(now, 1);
          else if (notifSettings.interview.timing === 'custom') timeframe = addDays(now, notifSettings.interview.customTiming || 1);
          
          if (timeframe && isWithinInterval(iDate, { start: now, end: timeframe })) {
            const notifId = `int_${app.id}_${timeframe.getTime()}`;
            if (!sessionStorage.getItem(notifId)) {
               newAlerts.push(`Interview approaching for ${app.company} - ${app.role}!`);
               sessionStorage.setItem(notifId, 'true');
            }
          }
        }
      }

      // FOLLOW-UP REMINDERS
      if (notifSettings.followUp?.enabled && app.followUpDate) {
        const fDate = parseISO(app.followUpDate);
        if (!isPast(fDate)) {
          let timeframe;
          if (notifSettings.followUp.timing === '2d') timeframe = addDays(now, 2);
          else if (notifSettings.followUp.timing === '3d') timeframe = addDays(now, 3);
          else if (notifSettings.followUp.timing === '5d') timeframe = addDays(now, 5);
          else if (notifSettings.followUp.timing === 'custom') timeframe = addDays(now, notifSettings.followUp.customTiming || 3);
          
          if (timeframe && isWithinInterval(fDate, { start: now, end: timeframe })) {
            const notifId = `fol_${app.id}_${timeframe.getTime()}`;
            if (!sessionStorage.getItem(notifId)) {
               newAlerts.push(`Time to follow up with ${app.company} regarding your application.`);
               sessionStorage.setItem(notifId, 'true');
            }
          }
        }
      }
    });

    if (newAlerts.length > 0) {
      setQueue(prev => [...prev, ...newAlerts]);
    }
  }, [applications, settings, appsLoading, settingsLoading]);

  useEffect(() => {
    if (queue.length && !currentAlert) {
      setCurrentAlert(queue[0]);
      setQueue(prev => prev.slice(1));
      setOpen(true);
    } else if (queue.length && currentAlert && open) {
      setOpen(false);
    }
  }, [queue, currentAlert, open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleExited = () => {
    setCurrentAlert(null);
  };

  return (
    <Snackbar
      key={currentAlert ? currentAlert : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="info" variant="filled" sx={{ width: '100%' }}>
        {currentAlert}
      </Alert>
    </Snackbar>
  );
};

export default NotificationEngine;
