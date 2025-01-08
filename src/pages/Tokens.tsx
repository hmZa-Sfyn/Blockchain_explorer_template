import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import tokens from "@/data/tokens.json";

const Tokens = () => {
  const { data: tokensData } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => tokens,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tokens</h1>
      <Card className="divide-y divide-border">
        {tokensData?.map((token) => (
          <Link
            key={token.token_address}
            to={`/token/${token.token_address}`}
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-1">
              <p className="font-medium">{token.name}</p>
              <p className="text-sm text-muted-foreground">
                {token.symbol}
              </p>
            </div>
            <div className="text-right">
              <p className="highlight">{token.total_supply.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                {token.holders_count} holders
              </p>
            </div>
          </Link>
        ))}
      </Card>
    </div>
  );
};

export default Tokens;
