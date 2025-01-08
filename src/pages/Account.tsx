import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import accounts from "../data/accounts.json";
import transactions from "../data/transactions.json";

const Account = () => {
  const { address } = useParams();
  
  const { data: account } = useQuery({
    queryKey: ["account", address],
    queryFn: () => accounts.find(a => a.account_address === address),
  });

  const { data: accountTransactions } = useQuery({
    queryKey: ["accountTransactions", address],
    queryFn: () => transactions.filter(tx => tx.from === address || tx.to === address),
  });

  if (!account) {
    return <div>Account not found</div>;
  }

  const transactionTypes = [
    { name: 'Sent', value: accountTransactions?.filter(tx => tx.from === address).length || 0 },
    { name: 'Received', value: accountTransactions?.filter(tx => tx.to === address).length || 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="grid gap-4">
            <div>
              <h3 className="text-sm text-muted-foreground">Address</h3>
              <p className="font-medium">{account.account_address}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Balance</h3>
              <p className="font-medium">{account.balance} ETH</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Transactions</h3>
              <Link 
                to={`/account/${account.account_address}/transactions`}
                className="font-medium text-primary hover:underline"
              >
                {account.transactions_count} transactions
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {transactionTypes.map((entry, index) => (
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

export default Account;