import { GameDescriptions } from "./localTypes";
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
  },
};

const key: string = process.env.OPENSEA || "no_api_key";

export const headers: Headers = new Headers({
  accept: "application/json",
  "x-api-key": key,
});

export const BASE_URL = "https://api.opensea.io/api/v2";
