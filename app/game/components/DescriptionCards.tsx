import Image from 'next/image';

interface DescriptionCardsProps {
  communityScore: string;
  playerCount: string;
  rewardsText: string;
  stars: string;
  rr: string;
  genre: string;
  friendly: string;
}

interface DescriptionCardProps {
  item: string;
  description?: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  item,
  description
}) => {
  return (
    <div className="flex flex-col bg-black rounded-lg items-center justify-center m-1 p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <span className="text-white font-semibold text-lg">{item}</span>
      <span className="text-xs mt-1">{description}</span>
    </div>
  );
};

const DescriptionCards: React.FC<DescriptionCardsProps> = ({
  communityScore,
  playerCount,
  rewardsText,
  stars,
  rr,
  genre,
  friendly
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-white p-4 rounded-lg shadow-inner border border-gray-800">
      <DescriptionCard
        item={communityScore}
        description="VPLAY Community Score"
      />
      <DescriptionCard item={playerCount} description="Player Count" />
      <DescriptionCard item={rewardsText} description="Rewards" />
      <DescriptionCard item={stars} description="Stars" />
      <DescriptionCard item={rr} description="RR" />
      <DescriptionCard item={genre} description="Genre" />
      <DescriptionCard item={friendly} description="Friendliness Rating" />
    </div>
  );
};

export default DescriptionCards;
