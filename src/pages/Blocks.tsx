import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import blocks from "@/data/blocks.json";

const Blocks = () => {
  const { data: blocksData } = useQuery({
    queryKey: ["blocks"],
    queryFn: () => blocks,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Latest Blocks</h1>
      <Card className="divide-y divide-border">
        {blocksData?.map((block) => (
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
  );
};

export default Blocks;