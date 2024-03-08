import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { AssetEvent } from "@/utils/apiTypes";
import useGameStore from "@/store/gameStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { convertEthToUsd, convertWeiToEth } from "@/utils/utils";
import useEthPriceStore from "@/store/ethPriceStore";
import { LineChartIcon } from "lucide-react";

const NftSaleGraph: React.FC = () => {
  const { collectionSaleEvents } = useGameStore();
  const { ethPrice } = useEthPriceStore();

  const data = collectionSaleEvents.map((event) => ({
    timestamp: new Date(event.event_timestamp * 1000).toLocaleString(),
    price: convertEthToUsd(
      parseFloat(convertWeiToEth("ETH", 18, event.payment?.quantity || "0")),
      ethPrice
    ),
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>In Game Item Sales $USD</CardTitle>
        <LineChartIcon />
      </CardHeader>
      <CardContent>
        <LineChart width={1200} height={400} data={data}>
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="price" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default NftSaleGraph;
