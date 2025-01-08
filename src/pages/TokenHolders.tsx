import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import tokens from "@/data/tokens.json";

const TokenHolders = () => {
  const { address } = useParams();
  
  const { data: token } = useQuery({
    queryKey: ["token", address],
    queryFn: () => tokens.find(t => t.token_address === address),
  });

  if (!token) {
    return <div>Token not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{token.name} Holders</h1>
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          This token has {token.holders_count} holders
        </p>
      </Card>
    </div>
  );
};

export default TokenHolders;
