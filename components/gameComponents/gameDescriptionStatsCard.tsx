import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export interface StatsCardData {
  title: string;
  Icon: JSX.Element;
  value: string;
  change: string;
}

export const StatsCard: React.FC<StatsCardData> = ({
  title,
  Icon,
  value,
  change,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
};
