import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";
import { UserSettingsProvider } from "./contexts/UserSettingsContext";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <AuthProvider>
      <UserSettingsProvider>
        <ThemeContextProvider>
          <CssBaseline />
          <App />
        </ThemeContextProvider>
      </UserSettingsProvider>
    </AuthProvider>
  );
}
