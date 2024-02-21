/**
 * @type {import('next').NextConfig}
 * This configuration file is optimized for projects using Server-Side Rendering (SSR).
 * There are no specific settings to disable static optimizations as this project
 * relies on getServerSideProps for dynamic content fetching, ensuring pages are rendered server-side.
 */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'giphy.com' },
      { protocol: 'https', hostname: 'avatar.vercel.sh' },
      { protocol: 'https', hostname: 'i.seadn.io' },
      { protocol: 'https', hostname: 'openseauserdata.com' },
      { protocol: 'https', hostname: 'nft.mavia.com' },
      { protocol: 'https', hostname: 'ipfs.io' },
      { protocol: 'https', hostname: 'gateway.pinata.cloud' },
      { protocol: 'https', hostname: 'api.opensea.io' },
      {
        protocol: 'https',
        hostname: 'skygatetaiwan.s3.ap-southeast-1.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'pixelmon-training-rewards.s3-accelerate.amazonaws.com'
      },
      { protocol: 'https', hostname: 'resources.xter.io' },
      // Duplicate 'ipfs.io' removed for brevity
      { protocol: 'https', hostname: 'nftstorage.link' },
      { protocol: 'https', hostname: 'www.cryptokitties.co' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'api.decentraland.org' },
      { protocol: 'https', hostname: 'worlds-content-server.decentraland.org' },
      { protocol: 'https', hostname: 'places.decentraland.org' },
      { protocol: 'https', hostname: 'hang.mypinata.cloud' }
    ]
  }
  // Additional Next.js configurations tailored for SSR can be placed here.
};

module.exports = nextConfig;
