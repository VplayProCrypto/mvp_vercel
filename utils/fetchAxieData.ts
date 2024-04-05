import { SKYMAVIS_URL, skymavisHeaders } from "./consts";

export interface MetadataResponse {
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

const queryMetadata = `
    query Metadata {
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

const fetchSkymavis = async (query: string) => {
  const response = await fetch(SKYMAVIS_URL, {
    method: "POST",
    headers: skymavisHeaders,

    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export async function fetchMetadataOne(): Promise<MetadataResponse> {
  return fetchSkymavis(queryMetadata);
}
