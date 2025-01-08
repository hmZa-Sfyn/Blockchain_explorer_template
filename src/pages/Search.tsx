import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import blocks from "../data/blocks.json";
import transactions from "../data/transactions.json";
import accounts from "../data/accounts.json";
import tokens from "../data/tokens.json";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: searchResults } = useQuery({
    queryKey: ["search", query],
    queryFn: () => {
      const results = {
        blocks: blocks.filter(b => 
          b.block_hash.toLowerCase().includes(query.toLowerCase()) ||
          b.miner.toLowerCase().includes(query.toLowerCase())
        ),
        transactions: transactions.filter(tx => 
          tx.transaction_hash.toLowerCase().includes(query.toLowerCase()) ||
          tx.from.toLowerCase().includes(query.toLowerCase()) ||
          tx.to.toLowerCase().includes(query.toLowerCase())
        ),
        accounts: accounts.filter(a => 
          a.account_address.toLowerCase().includes(query.toLowerCase())
        ),
        tokens: tokens.filter(t => 
          t.token_address.toLowerCase().includes(query.toLowerCase()) ||
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.symbol.toLowerCase().includes(query.toLowerCase())
        ),
      };
      return results;
    },
  });

  if (!query) {
    return (
      <div className="text-center text-muted-foreground">
        Enter a search term to find blocks, transactions, accounts, or tokens
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
      
      {searchResults?.blocks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Blocks</h2>
          <Card className="divide-y divide-border">
            {searchResults.blocks.map(block => (
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
              </Link>
            ))}
          </Card>
        </div>
      )}

      {searchResults?.transactions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Transactions</h2>
          <Card className="divide-y divide-border">
            {searchResults.transactions.map(tx => (
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
              </Link>
            ))}
          </Card>
        </div>
      )}

      {searchResults?.accounts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Accounts</h2>
          <Card className="divide-y divide-border">
            {searchResults.accounts.map(account => (
              <Link
                key={account.account_address}
                to={`/account/${account.account_address}`}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium">{account.account_address}</p>
                  <p className="text-sm text-muted-foreground">
                    Balance: {account.balance} ETH
                  </p>
                </div>
              </Link>
            ))}
          </Card>
        </div>
      )}

      {searchResults?.tokens.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Tokens</h2>
          <Card className="divide-y divide-border">
            {searchResults.tokens.map(token => (
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
              </Link>
            ))}
          </Card>
        </div>
      )}

      {(!searchResults?.blocks.length && 
        !searchResults?.transactions.length && 
        !searchResults?.accounts.length && 
        !searchResults?.tokens.length) && (
        <div className="text-center text-muted-foreground">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default Search;
