import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import networkStats from "../data/network_stats.json";

const Network = () => {
  const { data: stats } = useQuery({
    queryKey: ["networkStats"],
    queryFn: () => networkStats,
  });

  if (!stats) {
    return <div>Loading network statistics...</div>;
  }

  // Sample data for the charts - in a real app, this would come from the API
  const networkGrowthData = [
    { name: 'Jan', blocks: 800000, transactions: 4000000 },
    { name: 'Feb', blocks: 850000, transactions: 4200000 },
    { name: 'Mar', blocks: 900000, transactions: 4500000 },
    { name: 'Apr', blocks: 950000, transactions: 4800000 },
    { name: 'May', blocks: 1000000, transactions: 5000000 },
  ];

  const networkDistribution = [
    { name: 'Active Miners', value: stats.active_miners },
    { name: 'Active Accounts', value: stats.active_accounts },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Network Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm text-muted-foreground">Total Blocks</h3>
          <p className="text-2xl font-bold">{stats.total_blocks.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-muted-foreground">Total Transactions</h3>
          <p className="text-2xl font-bold">{stats.total_transactions.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-muted-foreground">Current Gas Fee</h3>
          <p className="text-2xl font-bold">{stats.current_gas_fee} ETH</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Network Growth</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={networkGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="blocks" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="transactions" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Network Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={networkDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {networkDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Network Stats</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-muted-foreground">Network Hash Rate</h4>
              <p className="text-xl font-semibold">{stats.network_hash_rate}</p>
            </div>
            <div>
              <h4 className="text-sm text-muted-foreground">Difficulty</h4>
              <p className="text-xl font-semibold">{stats.difficulty.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm text-muted-foreground">Active Miners</h4>
              <p className="text-xl font-semibold">{stats.active_miners.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Network;