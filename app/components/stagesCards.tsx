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
    imageUrl: '/images/stage1_c1.gif',
    imageAlt: 'A description of the image for stage 1',
    description: " Vplay showcases GameFi insights from filtered and categorized big data for players to browse, access and play by the play aggregator. From NFT renting split reward earnings, to other passive incomes, from tokens that are down with a strong active community to listed games in order of highest rewards. Current player methods involve in depth GameFi knowledge learning and researching. "
  },
  {
    title: 'STAGE 02',
    imageUrl: '/images/stage2_c.gif',
    imageAlt: 'A description of the image for stage 2',
    description: 'Natural language queries, VPlay allows searches in natural language, allowing players to search from their own concepts and view results, uniquely presenting new opportunities, and significantly cutting down time and skill researching.'
  },
  {
    title: 'STAGE 03',
    imageUrl: '/images/stage3_c.gif',
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
      <div className="stage-component flex items-center justify-center">
        <button onClick={goToPreviousStage} className="stage-nav">{"<"}</button>
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="image-container flex-1">
            <Image src={imageUrl} alt={imageAlt} width={700} height={475} layout="responsive" />
          </div>
  
          <div className="text-content flex-1 p-4">
            <h2 className="stage-title">{title}</h2>
            <p className="stage-description">{description}</p>
          </div>
        </div>
        
        <button onClick={goToNextStage} className="stage-nav">{">"}</button>
  
        <style jsx>{`
          .stage-component {
            max-width: 1200px;
            margin: 20px auto;
            position: relative;
          }
          .stage-nav {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 24px;
            padding: 0 20px;
          }
          .image-container {
            max-width: 50%;
          }
          .stage-title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          .stage-description {
            font-size: 1rem;
          }
          .text-content {
            max-width: 50%;
          }
          @media (max-width: 768px) {
            .image-container, .text-content {
              max-width: 100%;
            }
            .stage-component {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    );
  };