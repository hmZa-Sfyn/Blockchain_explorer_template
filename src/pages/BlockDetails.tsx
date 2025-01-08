import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import blocks from "@/data/blocks.json";

const BlockDetails = () => {
  const { hash } = useParams();
  
  const { data: block } = useQuery({
    queryKey: ["block", hash],
    queryFn: () => blocks.find(b => b.block_hash === hash),
  });

  if (!block) {
    return <div>Block not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Block Details</h1>
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-muted-foreground">Block Hash</h3>
            <p className="font-medium">{block.block_hash}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Height</h3>
            <p className="font-medium">#{block.height}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Timestamp</h3>
            <p className="font-medium">{new Date(block.timestamp).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Transactions</h3>
            <p className="font-medium">{block.transactions_count}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Miner</h3>
            <p className="font-medium">{block.miner}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Reward</h3>
            <p className="font-medium">{block.reward} ETH</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlockDetails;