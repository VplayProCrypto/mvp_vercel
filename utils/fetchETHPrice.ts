// fetchEthPrice.ts
export async function fetchEthPrice() {
  try {
    const response = await fetch(
      "https://api.coinbase.com/v2/prices/ETH-USD/buy"
    );
    const data = await response.json();
    return data?.data?.amount;
  } catch (error) {
    console.error("Failed to fetch ETH price:", error);
    return null;
  }
}
