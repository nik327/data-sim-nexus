import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/context/UserContext";
import AppLayout from "@/components/AppLayout";
import Landing from "./pages/Landing";
import Gateway from "./pages/Gateway";
import DataVault from "./pages/DataVault";
import WorkHub from "./pages/WorkHub";
import Academy from "./pages/Academy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/gateway" element={<Gateway />} />
              <Route path="/vault" element={<DataVault />} />
              <Route path="/hub" element={<WorkHub />} />
              <Route path="/academy" element={<Academy />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
