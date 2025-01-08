import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import transactions from "@/data/transactions.json";

const TransactionDetails = () => {
  const { hash } = useParams();
  
  const { data: transaction } = useQuery({
    queryKey: ["transaction", hash],
    queryFn: () => transactions.find(tx => tx.transaction_hash === hash),
  });

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transaction Details</h1>
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-muted-foreground">Transaction Hash</h3>
            <p className="font-medium">{transaction.transaction_hash}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Status</h3>
            <p className="font-medium">{transaction.status ? "Success" : "Failed"}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">From</h3>
            <p className="font-medium">{transaction.from}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">To</h3>
            <p className="font-medium">{transaction.to}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Amount</h3>
            <p className="font-medium">{transaction.amount} {transaction.currency}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Gas Fee</h3>
            <p className="font-medium">{transaction.gas_fee} ETH</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Timestamp</h3>
            <p className="font-medium">{new Date(transaction.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionDetails;