import Image from 'next/image';
import { Collection } from '../../../app/types';

import YouTube from 'react-youtube';
import Carousel from './Carousel';
import GameIntro from './GameIntro';

const Video = () => {
  const videoId = '3PTstAK-cH8'; // Extract the video ID from the URL
  return <YouTube videoId={videoId} />;
};

interface ImageUrlsType {
  [key: string]: string;
}

const ImageImages: ImageUrlsType = {
  CryptoKitties:
    'https://www.cryptokitties.co/images/blog/kitty-cup-2022/kitty-cup-2022.jpg',
  Decentraland:
    'https://places.decentraland.org/places/images/places/genesis_plaza_banner.jpg'
};

interface VideoUrlsType {
  [key: string]: string;
}
//https://www.youtube.com/watch?v=M6gD3afBmkc
const VideoUrls: VideoUrlsType = {
  CryptoKitties: '3PTstAK-cH8',
  'Mavia Land': 'bYmpEeRG-_o',
  Decentraland: 'M6gD3afBmkc'
};

export const Hero: React.FC<{ game: Collection }> = ({ game }) => {
  const images = [
    VideoUrls[game.name],
    game.banner_image_url,
    ImageImages[game.name]
  ];

  return (
    <div className="bg-stone-800 text-white rounded-lg shadow-lg p-4 m-4 flex flex-col items-center">
      <div className="relative mt-4 mb-4">
        <Carousel
          images={images}
          hasVideo={game.name in VideoUrls}
          hasImage={game.name in ImageImages}
        />
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
