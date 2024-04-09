import { GameDescriptions } from "../types/opensea/localTypes";
//This is a temporary hack
export const gameDescription: GameDescriptions = {
  CryptoKitties: {
    playNowButtonText: "Play Now",
    itemsText: "Items",
    communityScore: "A",
    playerCount: "Top 10%",
    rewardsText: "Average Rewards",
    stars: "5",
    rr: "272",
    genre: "Pets",
    friendly: "Beginner Friendly",
    videoUrl: "https://www.youtube.com/watch?v=M6gD3afBmkc",
    image:
      "https://www.cryptokitties.co/images/blog/kitty-cup-2022/kitty-cup-2022.jpg",
  },
  "Mavia Land": {
    playNowButtonText: "Play Now",
    itemsText: "Items",
    communityScore: "B",
    playerCount: "Top 10%",
    rewardsText: "Above Average Rewards",
    stars: "4",
    rr: "143 days",
    genre: "MMO",
    friendly: "Friendly",
    videoUrl: "",
    image: "https://www.mavi.io/wp-content/uploads/2022/08/mavia-land.png",
  },
  Decentraland: {
    playNowButtonText: "Play Now",
    itemsText: "Items",
    communityScore: "C",
    playerCount: "Top 30%",
    rewardsText: "Average Rewards",
    stars: "4",
    rr: "",
    genre: "MMO",
    friendly: "Friendly",
    videoUrl: "",
    image: "",
  },
  "Pixels - Farm Land": {
    playNowButtonText: "Play Now",
    itemsText: "Items",
    communityScore: "A",
    playerCount: "Top 30%",
    rewardsText: "Average Rewards",
    stars: "5",
    rr: "238 days",
    genre: "Pixel Art",
    friendly: "Beginner Friendly",
    videoUrl: "",
    image: "",
  },
};

const key: string = process.env.OPENSEA || "no_api_key";

export const headers: Headers = new Headers({
  accept: "application/json",
  "x-api-key": key,
});

export const BASE_URL = "https://api.opensea.io/api/v2";
export const SKYMAVIS_URL =
  "https://api-gateway.skymavis.com/graphql/axie-marketplace";

export const skymavisHeaders: Headers = new Headers({
  accept: "application/json",
  "x-api-key": process.env.SKYMAVIS || "no_api_key",
  "Content-Type": "application/json", // Add this line
});
