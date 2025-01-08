import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Blocks from "./pages/Blocks";
import BlockDetails from "./pages/BlockDetails";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import Account from "./pages/Account";
import AccountTransactions from "./pages/AccountTransactions";
import Tokens from "./pages/Tokens";
import TokenDetails from "./pages/TokenDetails";
import TokenHolders from "./pages/TokenHolders";
import Search from "./pages/Search";
import Network from "./pages/Network";
import { Navbar } from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/blocks" element={<Blocks />} />
              <Route path="/block/:hash" element={<BlockDetails />} />
              <Route path="/txs" element={<Transactions />} />
              <Route path="/tx/:hash" element={<TransactionDetails />} />
              <Route path="/account/:address" element={<Account />} />
              <Route path="/account/:address/transactions" element={<AccountTransactions />} />
              <Route path="/tokens" element={<Tokens />} />
              <Route path="/token/:address" element={<TokenDetails />} />
              <Route path="/token/:address/holders" element={<TokenHolders />} />
              <Route path="/search" element={<Search />} />
              <Route path="/network" element={<Network />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;