import { CurrentListingPrice } from './types';

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
  console.log(currentPrice);
  return currentPrice.currency === 'ETH'
    ? convertWeiToEth('ETH', 18, currentPrice.value) +
        ' ' +
        currentPrice.currency
    : currentPrice.value + ' ' + currentPrice.currency;
};
