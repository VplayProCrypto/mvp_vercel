import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tab } from "@/types/localTypes";
import { ReactNode } from "react";

interface GameTabsProps {
  tabs: Tab[];
  ethPrice?: number | null;
}

const GameTabs: React.FC<GameTabsProps> = (props) => {
  const { tabs } = props;
  return (
    <Tabs defaultValue="Overview" className="w-full">
      <TabsList className="grid w-full grid-cols-8">
        {tabs.map((tab) => (
          <TabsTrigger value={tab.name}>{tab.name}</TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent value={tab.name} key={tab.name}>
          {tab.value}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default GameTabs;
