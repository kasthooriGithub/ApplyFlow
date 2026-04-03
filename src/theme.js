import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#6366f1", // Indigo
        light: "#818cf8",
        dark: "#4f46e5",
        contrastText: "#ffffff",
        // @ts-ignore
        lighter: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)",
      },
      secondary: {
        main: "#ec4899", // Pink
        light: "#f472b6",
        dark: "#db2777",
        contrastText: "#ffffff",
      },
      warning: {
        main: "#f59e0b", // Amber
        light: "#fbbf24",
        dark: "#d97706",
        // @ts-ignore
        lighter: isDark ? "rgba(245, 158, 11, 0.1)" : "#fffbeb",
      },
      success: {
        main: "#10b981", // Emerald
        light: "#34d399",
        dark: "#059669",
        // @ts-ignore
        lighter: isDark ? "rgba(16, 185, 129, 0.1)" : "#ecfdf5",
      },
      error: {
        main: "#ef4444", // Red
        light: "#f87171",
        dark: "#dc2626",
        // @ts-ignore
        lighter: isDark ? "rgba(239, 68, 68, 0.1)" : "#fef2f2",
      },
      info: {
        main: "#3b82f6", // Blue
        light: "#60a5fa",
        dark: "#2563eb",
        // @ts-ignore
        lighter: isDark ? "rgba(59, 130, 246, 0.1)" : "#eff6ff",
      },
      background: {
        default: isDark ? "#0f172a" : "#f8fafc",
        paper: isDark ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f8fafc" : "#0f172a",
        secondary: isDark ? "#94a3b8" : "#64748b",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(148, 163, 184, 0.1)",
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 800 },
      h4: { fontWeight: 800 },
      h5: { fontWeight: 800 },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      body1: { fontSize: "1rem", lineHeight: 1.6 },
      body2: { fontSize: "0.875rem", lineHeight: 1.6 },
      button: { fontWeight: 700, textTransform: "none" },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "8px 20px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: isDark
                ? "0 4px 12px rgba(0,0,0,0.5)"
                : "0 4px 12px rgba(0,0,0,0.1)",
            },
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(99, 102, 241, 0.25)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: "none",
            boxShadow: isDark
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              : "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "16px",
            borderBottom: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(148, 163, 184, 0.08)"
            }`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
          },
        },
      },
    },
  });
};
