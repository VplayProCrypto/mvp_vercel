import YouTube from "react-youtube";
import { CurrentListingPrice } from "../types/apiTypes";
import { headers, BASE_URL } from "./consts";
export function convertWeiToEth(
  currency: string,
  decimals: number,
  value: string
): string {
  if (currency !== "ETH" || decimals !== 18) {
    throw new Error("Unsupported currency or decimals");
  }

  const valueWei = BigInt(value);
  const divisor = BigInt(`1${"0".repeat(decimals)}`);

  const quotient = (valueWei / divisor).toString();
  const remainder = (valueWei % divisor).toString().padStart(decimals, "0");

  // Combine quotient and remainder, then remove trailing zeros
  const result = `${quotient}.${remainder}`.replace(/\.?0+$/, "");

  return result;
}

// Testing the function

export const parsePrice = (currentPrice: CurrentListingPrice) => {
  return currentPrice.currency === "ETH"
    ? convertWeiToEth("ETH", 18, currentPrice.value) +
        " " +
        currentPrice.currency
    : currentPrice.value + " " + currentPrice.currency;
};

//This is temporary code

const games = ["cryptokitties", "mavia-land", "pixels-farm", "decentraland"];

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 3,
  backoff: number = 300
): Promise<any> {
  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw new Error(`Fetch failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Fetch attempt failed: ${error}`);
    if (retries > 0) {
      console.log(`Retry #${4 - retries} after ${backoff}ms`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    } else throw error;
  }
}

export const convertEthToUsd = (
  amountInEth: number,
  ethPriceInUsd: number | null
): number => amountInEth * (ethPriceInUsd || 0.0);

export const fetchApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, { method: "GET", headers });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return (await response.json()) as T;
};
