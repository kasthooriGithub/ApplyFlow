import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getAppTheme } from "../theme";
import { useUserSettings } from "./UserSettingsContext";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { settings, updateSettings, loading } = useUserSettings();

  const [mode, setLocalMode] = useState(() => {
    const savedMode = localStorage.getItem("app-theme-mode");
    return savedMode || "system";
  });

  useEffect(() => {
    if (!loading && settings && settings.themeMode && settings.themeMode !== mode) {
      setLocalMode(settings.themeMode);
      localStorage.setItem("app-theme-mode", settings.themeMode);
    }
  }, [loading, settings]);

  const setMode = (newMode) => {
    setLocalMode(newMode);
    localStorage.setItem("app-theme-mode", newMode);
    updateSettings({ themeMode: newMode });
  };

  const activeMode = useMemo(() => {
    if (mode === "system") {
      return prefersDarkMode ? "dark" : "light";
    }
    return mode;
  }, [mode, prefersDarkMode]);

  const theme = useMemo(() => getAppTheme(activeMode), [activeMode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, activeMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
