import { Link } from "react-router-dom";

interface AddressLinkProps {
  address: string;
  className?: string;
}

export const AddressLink = ({ address, className }: AddressLinkProps) => {
  return (
    <Link
      to={`/account/${address}`}
      className={`text-primary hover:underline ${className || ''}`}
    >
      {address}
    </Link>
  );
};