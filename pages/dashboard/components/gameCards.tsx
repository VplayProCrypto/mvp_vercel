import Image from 'next/image';
import { Card, Title } from '@tremor/react';

interface GameCardProps {
  gameName: string;
  background: string;
}

export const GameCard: React.FC<GameCardProps> = ({ gameName, background }) => {
  return (
    <Card className="game-card relative">
      <Title>{gameName}</Title>
      <div className="game-background relative h-60"> {/* Adjust height as needed */}
        {/* Use Next.js Image component for optimized images */}
        <Image
          src={background}
          decoding='async'
          layout="fill" // This makes the image cover the container, adjust as needed
          objectFit="cover" // Adjust according to your styling needs
          alt={`${gameName} background`}
        />
      </div>
      <h1>
        
      </h1>
    </Card>
  );
};
