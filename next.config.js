/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'giphy.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      },
      {
        protocol: 'https',
        hostname: 'i.seadn.io'
      },
      {
        protocol: 'https',
        hostname: 'openseauserdata.com'
      },
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
      { protocol: 'https', hostname: 'ipfs.io' },
      { protocol: 'https', hostname: 'nftstorage.link' },
      { protocol: 'https', hostname: 'www.cryptokitties.co' },
      { protocol: 'https', hostname: 'img.youtube.com' }
    ]
  }
};

module.exports = nextConfig;
