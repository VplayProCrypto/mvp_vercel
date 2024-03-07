import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Users,
  DollarSign,
  ShoppingBag,
  CreditCard,
  CandlestickChart,
  BadgeDollarSign,
  Activity,
} from "lucide-react";
import { Collection, CollectionStats } from "@/utils/apiTypes";
import { convertEthToUsd } from "@/utils/utils";

interface OverviewProps {
  game: Collection;
  stats: CollectionStats;
  ethPrice: number | null;
}

interface StatsCardData {
  title: string;
  Icon: JSX.Element;
  value: string;
  change: string;
}

const StatsCard: React.FC<StatsCardData> = ({ title, Icon, value, change }) => {
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
const Overview: React.FC<OverviewProps> = ({ game, stats, ethPrice }) => {
  const cardsData: StatsCardData[] = [
    {
      title: "Total Items",
      Icon: <ShoppingBag />,
      value: `${game.total_supply} items`,
      change: "+20.1% from last month",
    },
    {
      title: "Total Volume",
      Icon: <Activity />,
      value: `$${convertEthToUsd(stats.total.volume, ethPrice)}`,
      change: "+180.1% from last month",
    },
    {
      title: "Total Sales",
      Icon: <CreditCard />,
      value: `$${convertEthToUsd(stats.total.sales, ethPrice)}`,
      change: "+180.1% from last month",
    },
    {
      title: "Average Price",
      Icon: <BadgeDollarSign />,
      value: `$${convertEthToUsd(stats.total.average_price, ethPrice)}`,
      change: "+180.1% from last month",
    },
    {
      title: "Owners",
      Icon: <Users />,
      value: `${stats.total.num_owners}`,
      change: "+180.1% from last month",
    },
    {
      title: "Market Capitalization",
      Icon: <DollarSign />,
      value: `$${convertEthToUsd(stats.total.market_cap, ethPrice)}`,
      change: "+180.1% from last month",
    },
    {
      title: "Floor Price",
      Icon: <BadgeDollarSign />,
      value: `$${convertEthToUsd(stats.total.floor_price, ethPrice)}`,
      change: "+180.1% from last month",
    },
  ];

  return (
    <div className="mr-5 ml-5">
      <div>
        <h2>Description</h2>
        <p>{game.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardsData.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            Icon={card.Icon}
            value={card.value}
            change={card.change}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;

//Add graph for sales per day using unix timestamp from db
