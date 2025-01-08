import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { Blocks, Coins, Users, Gauge } from "lucide-react";
import networkOverview from "@/data/network_overview.json";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import blocks from "@/data/blocks.json";
import transactions from "@/data/transactions.json";

const Dashboard = () => {
  const { data: networkData } = useQuery({
    queryKey: ["networkOverview"],
    queryFn: () => networkOverview,
  });

  const recentBlocks = blocks.slice(0, 5);
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Network Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Blocks"
          value={networkData?.total_blocks || 0}
          icon={<Blocks className="w-6 h-6" />}
        />
        <StatCard
          title="Total Transactions"
          value={networkData?.total_transactions || 0}
          icon={<Coins className="w-6 h-6" />}
        />
        <StatCard
          title="Active Accounts"
          value={networkData?.active_accounts || 0}
          icon={<Users className="w-6 h-6" />}
        />
        <StatCard
          title="Current Gas Fee"
          value={`${networkData?.current_gas_fee || 0} ETH`}
          icon={<Gauge className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Latest Blocks</h2>
            <Link to="/blocks" className="text-primary hover:underline">
              View all blocks
            </Link>
          </div>
          <Card className="divide-y divide-border">
            {recentBlocks.map((block) => (
              <Link
                key={block.block_hash}
                to={`/block/${block.block_hash}`}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium">Block #{block.height}</p>
                  <p className="text-sm text-muted-foreground">
                    Miner: {block.miner}
                  </p>
                </div>
                <div className="text-right">
                  <p className="highlight">{block.transactions_count} txns</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(block.timestamp).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Latest Transactions</h2>
            <Link to="/txs" className="text-primary hover:underline">
              View all transactions
            </Link>
          </div>
          <Card className="divide-y divide-border">
            {recentTransactions.map((tx) => (
              <Link
                key={tx.transaction_hash}
                to={`/tx/${tx.transaction_hash}`}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium truncate max-w-[200px]">
                    {tx.transaction_hash}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    From: {tx.from}
                  </p>
                </div>
                <div className="text-right">
                  <p className="highlight">{tx.amount} {tx.currency}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;