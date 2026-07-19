import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppRoutes, { DASHBOARD_PATHS } from "@/routes/AppRoutes";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

// Suppress the public Navbar/Footer on dashboard and auth routes
function AppShell() {
  const location = useLocation();
  const isDashboard = DASHBOARD_PATHS.some((p) => location.pathname.startsWith(p));
  const isAuth = location.pathname === "/login" || location.pathname === "/register";
  const hideChrome = isDashboard || isAuth;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!hideChrome && <Navbar />}
      <main className={hideChrome ? "flex-1" : "flex-1"}>
        <AppRoutes />
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
