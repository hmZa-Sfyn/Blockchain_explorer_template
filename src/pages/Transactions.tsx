import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import transactions from "@/data/transactions.json";

const Transactions = () => {
  const { data: transactionsData } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactions,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Latest Transactions</h1>
      <Card className="divide-y divide-border">
        {transactionsData?.map((tx) => (
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
  );
};

export default Transactions;