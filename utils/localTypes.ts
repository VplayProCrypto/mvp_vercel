import { ReactNode } from "react";

export interface JobPostingFields {
  Introduction?: string;
  "Required experience"?: string;
  "Position status"?: string;
  Category?: string;
  Overview?: string;
  "Job Description"?: string;
  "Applying for position"?: string[];
  Department?: string;
  Name?: string;
  "Apply Now"?: {
    label: string;
    url: string;
  };
  record_id?: string;
}

export interface JobPosting {
  id: string;
  createdTime: string;
  fields: JobPostingFields;
}

export interface GameDescription {
  playNowButtonText: string;
  itemsText: string;
  communityScore: string;
  playerCount: string;
  rewardsText: string;
  stars: string;
  rr: string;
  genre: string;
  friendly: string;
}

export interface GameDescriptions {
  [key: string]: GameDescription;
}

interface VideoUrlsType {
  [key: string]: string;
}
//https://www.youtube.com/watch?v=M6gD3afBmkc
const VideoUrls: VideoUrlsType = {
  CryptoKitties: "3PTstAK-cH8",
  "Mavia Land": "bYmpEeRG-_o",
  Decentraland: "M6gD3afBmkc",
};

interface ImageUrlsType {
  [key: string]: string;
}
export const Images: ImageUrlsType = {
  CryptoKitties:
    "https://www.cryptokitties.co/images/blog/kitty-cup-2022/kitty-cup-2022.jpg",
  Decentraland:
    "https://places.decentraland.org/places/images/places/genesis_plaza_banner.jpg",
};

export type Tab = {
  name: string;
  value: ReactNode;
};
