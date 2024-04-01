import { SKYMAVIS_URL, skymavisHeaders } from "./consts";

interface MetadataOneResponse {
  data: {
    axies: {
      total: number;
    };
    overallMarketStats: {
      axieStats: {
        totalOwners: number;
        last24HFloorPriceChart: number[];
      };
      mkpVolume: {
        allTime: number;
        last24H: number;
      };
      mkpTxs: {
        allTime: number;
      };
    };
  };
}

export async function fetchMetadataOne(): Promise<MetadataOneResponse> {
  const query = `
    query MetadataOne {
      axies {
        total
      }
      overallMarketStats {
        axieStats {
          totalOwners
          last24HFloorPriceChart
        }
        mkpVolume {
          allTime
          last24H
        }
        mkpTxs {
          allTime
        }
      }
    }
  `;

  const response = await fetch(SKYMAVIS_URL, {
    method: "POST",
    headers: skymavisHeaders,

    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: MetadataOneResponse = await response.json();
  return data;
}
