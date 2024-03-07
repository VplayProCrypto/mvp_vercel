import { useState, useEffect } from "react";

const useFetchEthPrice = () => {
  const [ethPrice, setEthPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEthPrice = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.coinbase.com/v2/prices/ETH-USD/buy"
        );
        const data = await response.json();
        setEthPrice(data?.data?.amount);
      } catch (error) {
        console.error("Failed to fetch ETH price:", error);
        setEthPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEthPrice();
  }, []);

  return { ethPrice, loading };
};

export default useFetchEthPrice;
