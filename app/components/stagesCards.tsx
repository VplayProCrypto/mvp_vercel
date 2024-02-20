import React, { useState } from 'react';
import Image from 'next/image';

interface StageData {
  title: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
}

const stageData: StageData[] = [
  {
    title: 'STAGE 01',
    imageUrl: '/path/to/your/image-or-gif-1.gif',
    imageAlt: 'A description of the image for stage 1',
    description: " Vplay showcases GameFi insights from filtered and categorized big data for players to browse, access and play by the play aggregator. From NFT renting split reward earnings, to other passive incomes, from tokens that are down with a strong active community to listed games in order of highest rewards. Current player methods involve in depth GameFi knowledge learning and researching. "
  },
  {
    title: 'STAGE 02',
    imageUrl: '/path/to/your/image-or-gif-2.gif',
    imageAlt: 'A description of the image for stage 2',
    description: 'Natural language queries, VPlay allows searches in natural language, allowing players to search from their own concepts and view results, uniquely presenting new opportunities, and significantly cutting down time and skill researching.'
  },
  {
    title: 'STAGE 03',
    imageUrl: '/path/to/your/image-or-gif-3.gif',
    imageAlt: 'A description of the image for stage 3',
    description: 'Engage in full-scale GameFi activities directly in your search & instructional chat results. Playing, passive game income streams, trading, buying, selling, swapping, renting NFTs, tokens, coins and staking — all become seamlessly integrated into your VPlay experience. Eliminating the use of different protocols and Ul difficulties for various GameFi activities.'
  },
  // Add more stages as needed
];

export const StageComponent: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const goToPreviousStage = () => {
    setCurrentStage((prevStage) => (prevStage === 0 ? stageData.length - 1 : prevStage - 1));
  };

  const goToNextStage = () => {
    setCurrentStage((prevStage) => (prevStage === stageData.length - 1 ? 0 : prevStage + 1));
  };

  const { title, imageUrl, imageAlt, description } = stageData[currentStage];

  return (
    <div className="stage-component">
      <button onClick={goToPreviousStage}>{"<"}</button>
      <div>
        <h2 className="stage-title">{title}</h2>
        <div className="image-container">
          <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="cover" />
        </div>
        <p className="stage-description">{description}</p>
      </div>
      <button onClick={goToNextStage}>{">"}</button>
      
      {/* Add your styles here */}
    </div>
  );
};

