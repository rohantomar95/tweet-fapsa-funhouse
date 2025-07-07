import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Spaces from "./pages/Spaces";
import Sessions from "./pages/Sessions";
import Fractals from "./pages/Fractals";
import Faps from "./pages/Faps";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/fractals" element={<Fractals />} />
          <Route path="/faps" element={<Faps />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
