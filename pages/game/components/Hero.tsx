import Image from 'next/image';
import { Collection } from '../../../app/types';

import YouTube from 'react-youtube';
import Carousel from './Carousel';
import GameIntro from './GameIntro';

const Video = () => {
  const videoId = '3PTstAK-cH8'; // Extract the video ID from the URL
  return <YouTube videoId={videoId} />;
};

export const Hero: React.FC<{ game: Collection }> = ({ game }) => {
  const images = [
    '3PTstAK-cH8',
    game.banner_image_url,
    'https://www.cryptokitties.co/images/blog/kitty-cup-2022/kitty-cup-2022.jpg',
    'https://www.cryptokitties.co/images/blog/a-new-fancy-cat-has-joined-the-round-table-of-catelot/a-new-fancy-cat-has-joined-the-round-table-of-catelot.jpg'
  ];

  return (
    <div className="bg-stone-800 text-white rounded-lg shadow-lg p-4 m-4 flex flex-col items-center">
      <div className="relative mt-4 mb-4">
        <Carousel images={images} hasVideo={true} />
      </div>

      <GameIntro
        title={game.name}
        description={game.description}
        imageUrl={game.image_url}
        playNowButtonText="Play Now"
        itemsText="Items"
        communityScore="A VPLAY Community Score"
        playerCount="Top 20% Player Count"
        rewardsText="High Rewards"
        stars="4"
        rr="10 Day RR"
        genre="Pet"
        friendly="Beginner Friendly"
        game={game}
      />
    </div>
  );
};
