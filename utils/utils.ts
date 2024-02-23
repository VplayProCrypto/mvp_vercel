import { CurrentListingPrice, GameDescriptions } from './types';

export function convertWeiToEth(
  currency: string,
  decimals: number,
  value: string
): string {
  if (currency !== 'ETH' || decimals !== 18) {
    throw new Error('Unsupported currency or decimals');
  }

  const valueWei = BigInt(value);
  const divisor = BigInt(`1${'0'.repeat(decimals)}`);

  const quotient = (valueWei / divisor).toString();
  const remainder = (valueWei % divisor).toString().padStart(decimals, '0');

  // Combine quotient and remainder, then remove trailing zeros
  const result = `${quotient}.${remainder}`.replace(/\.?0+$/, '');

  return result;
}

// Testing the function

export const parsePrice = (currentPrice: CurrentListingPrice) => {
  return currentPrice.currency === 'ETH'
    ? convertWeiToEth('ETH', 18, currentPrice.value) +
        ' ' +
        currentPrice.currency
    : currentPrice.value + ' ' + currentPrice.currency;
};

//This is temporary code

const games = ['cryptokitties', 'mavia-land', 'pixels-farm', 'decentraland'];

export const gameDescription: GameDescriptions = {
  CryptoKitties: {
    playNowButtonText: 'Play Now',
    itemsText: 'Items',
    communityScore: 'A',
    playerCount: 'Top 10%',
    rewardsText: 'Average Rewards',
    stars: '5',
    rr: '272',
    genre: 'Pets',
    friendly: 'Beginner Friendly'
  },
  'Mavia Land': {
    playNowButtonText: 'Play Now',
    itemsText: 'Items',
    communityScore: 'B',
    playerCount: 'Top 10%',
    rewardsText: 'Above Average Rewards',
    stars: '4',
    rr: '143 days',
    genre: 'MMO',
    friendly: 'Friendly'
  },
  Decentraland: {
    playNowButtonText: 'Play Now',
    itemsText: 'Items',
    communityScore: 'C',
    playerCount: 'Top 30%',
    rewardsText: 'Average Rewards',
    stars: '4',
    rr: '',
    genre: 'MMO',
    friendly: 'Friendly'
  },
  'Pixels - Farm Land': {
    playNowButtonText: 'Play Now',
    itemsText: 'Items',
    communityScore: 'A',
    playerCount: 'Top 30%',
    rewardsText: 'Average Rewards',
    stars: '5',
    rr: '238 days',
    genre: 'Pixel Art',
    friendly: 'Beginner Friendly'
  }
};
