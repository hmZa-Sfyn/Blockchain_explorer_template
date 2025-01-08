import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import transactions from "@/data/transactions.json";

const AccountTransactions = () => {
  const { address } = useParams();
  
  const { data: accountTransactions } = useQuery({
    queryKey: ["accountTransactions", address],
    queryFn: () => transactions.filter(tx => tx.from === address || tx.to === address),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account Transactions</h1>
      <Card className="divide-y divide-border">
        {accountTransactions?.map((tx) => (
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
                {tx.from === address ? "Sent to: " + tx.to : "Received from: " + tx.from}
              </p>
            </div>
            <div className="text-right">
              <p className={`highlight ${tx.from === address ? "text-red-500" : "text-green-500"}`}>
                {tx.from === address ? "-" : "+"}{tx.amount} {tx.currency}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(tx.timestamp).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </Card>
    </div>
  );
};

export default AccountTransactions;