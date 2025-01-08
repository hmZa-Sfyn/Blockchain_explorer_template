import { Card } from "./ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1 highlight">{value}</h3>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </Card>
  );
};