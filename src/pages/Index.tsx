import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { Navbar } from "@/components/Navbar";
import { Blocks, Activity, Users, Gauge } from "lucide-react";
import networkStats from "@/data/network_stats.json";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6">
        <h1 className="text-4xl font-bold mb-8">Network Overview</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Blocks"
            value={networkStats.total_blocks.toLocaleString()}
            icon={<Blocks className="h-6 w-6" />}
          />
          <StatCard
            title="Total Transactions"
            value={networkStats.total_transactions.toLocaleString()}
            icon={<Activity className="h-6 w-6" />}
          />
          <StatCard
            title="Active Accounts"
            value={networkStats.active_accounts.toLocaleString()}
            icon={<Users className="h-6 w-6" />}
          />
          <StatCard
            title="Current Gas Fee"
            value={`${networkStats.current_gas_fee} ETH`}
            icon={<Gauge className="h-6 w-6" />}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;