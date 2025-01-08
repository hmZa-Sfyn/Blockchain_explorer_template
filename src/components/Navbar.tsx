import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search");
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className="w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Block Explorer
            </span>
          </Link>
          <div className="flex gap-6 md:gap-10">
            <Link to="/blocks" className="hover:text-primary">Blocks</Link>
            <Link to="/txs" className="hover:text-primary">Transactions</Link>
            <Link to="/tokens" className="hover:text-primary">Tokens</Link>
            <Link to="/network" className="hover:text-primary">Network</Link>
          </div>
        </div>
        <form onSubmit={handleSearch} className="flex-1 md:flex-initial ml-auto md:ml-0">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Block / Transaction / Address"
              name="search"
              className="pl-8 w-full md:w-[300px] bg-muted"
            />
          </div>
        </form>
      </div>
    </nav>
  );
};