import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider, useUser } from "@/context/UserContext";
import { SectorProvider, useSector } from "@/context/SectorContext";
import AppLayout from "@/components/AppLayout";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import SectorSelect from "./pages/SectorSelect";
import Gateway from "./pages/Gateway";
import AssessmentBriefing from "./pages/AssessmentBriefing";
import Assessment from "./pages/Assessment";
import DataVault from "./pages/DataVault";
import WorkHub from "./pages/WorkHub";
import Academy from "./pages/Academy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-primary font-mono text-sm animate-pulse">Initializing terminal...</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function AuthRoute() {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-primary font-mono text-sm animate-pulse">Initializing terminal...</div>
      </div>
    );
  }
  if (user) return <Navigate to="/" replace />;
  return <Auth />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <SectorProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthRoute />} />
              <Route
                path="/sector"
                element={
                  <ProtectedRoute>
                    <SectorSelect />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessment-briefing"
                element={
                  <ProtectedRoute>
                    <AssessmentBriefing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessment"
                element={
                  <ProtectedRoute>
                    <Assessment />
                  </ProtectedRoute>
                }
              />
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Landing />} />
                <Route path="/internship" element={<Gateway />} />
                <Route path="/vault" element={<DataVault />} />
                <Route path="/hub" element={<WorkHub />} />
                <Route path="/academy" element={<Academy />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SectorProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
