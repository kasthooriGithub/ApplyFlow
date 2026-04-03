import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationDetails from "./pages/ApplicationDetails";
import DashboardLayout from "./components/layout/DashboardLayout";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/new" element={<ApplicationForm />} />
          <Route path="/applications/:id" element={<ApplicationDetails />} />
          <Route path="/applications/:id/edit" element={<ApplicationForm />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

