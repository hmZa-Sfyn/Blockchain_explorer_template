import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { AddressLink } from "@/components/AddressLink";
import tokens from "../data/tokens.json";

const TokenDetails = () => {
  const { address } = useParams();
  
  const { data: token } = useQuery({
    queryKey: ["token", address],
    queryFn: () => tokens.find(t => t.token_address === address),
  });

  if (!token) {
    return <div>Token not found</div>;
  }

  // Sample holder distribution data - in a real app, this would come from the API
  const holderDistribution = [
    { name: 'Top 10 Holders', value: token.holders_count * 0.6 },
    { name: 'Other Holders', value: token.holders_count * 0.4 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Token Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="grid gap-4">
            <div>
              <h3 className="text-sm text-muted-foreground">Token Address</h3>
              <AddressLink address={token.token_address} />
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Name</h3>
              <p className="font-medium">{token.name}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Symbol</h3>
              <p className="font-medium">{token.symbol}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Total Supply</h3>
              <p className="font-medium">{token.total_supply.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Holders</h3>
              <Link 
                to={`/token/${token.token_address}/holders`}
                className="font-medium text-primary hover:underline"
              >
                {token.holders_count} holders
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Holder Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={holderDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {holderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TokenDetails;