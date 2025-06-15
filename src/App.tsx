import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VenuePage from "./pages/VenuePage";
import InvitationsPage from "./pages/InvitationsPage";
import PhotographyPage from "./pages/PhotographyPage";
import SummaryPage from "./pages/SummaryPage";
import NotFound from "./pages/NotFound";
import LiquorPage from "./pages/LiquorPage";
import WeddingCakesPage from "./pages/WeddingCakesPage";
import DecorationsPage from "./pages/DecorationsPage";
import MusicBandPage from "./pages/MusicBandPage";
import WeddingCarPage from "./pages/WeddingCarPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/invitations" element={<InvitationsPage />} />
          <Route path="/wedding-car" element={<WeddingCarPage />} />
          <Route path="/liquor" element={<LiquorPage />} />
          <Route path="/wedding-cakes" element={<WeddingCakesPage />} />
          <Route path="/decorations" element={<DecorationsPage />} />
          <Route path="/music-band" element={<MusicBandPage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
