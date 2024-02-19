import Image from 'next/image';
import { Collection } from '../../../app/types';

import YouTube from 'react-youtube';
import Carousel from './Carousel';
import GameIntro from './GameIntro';

const Video = () => {
  const videoId = '3PTstAK-cH8'; // Extract the video ID from the URL
  return <YouTube videoId={videoId} />;
};

interface VideoOrBannerProps {
  name: string;
  banner_image_url: string;
}

const VideoOrBanner = (name: string, banner_image_url: string) => {
  if (name == 'CryptoKitties') {
    return <Video />;
  }

  return (
    <div className="relative mt-4 mb-4">
      {banner_image_url ? (
        <Image
          src={banner_image_url}
          height={1000}
          width={10000}
          alt={name}
          className="mt-4"
        />
      ) : (
        <p className="text-sm text-gray-500 mt-4">No banner image</p>
      )}
    </div>
  );
};

//https://www.cryptokitties.co/images/blog/kitty-cup-2022/kitty-cup-2022.jpg

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
        stars={4}
        twentyDayRR="20 Day RR"
        rpgText="RPG"
        beginnerFriendly="Beginner Friendly"
        engine="Built with Unreal Engine 5"
      />
    </div>
  );
};
