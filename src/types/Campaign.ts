// types/Campaign.ts
export type CampaignSize = "short" | "medium" | "long";

export interface CampaignInput {
  genre: string;
  size: CampaignSize;
  beats: string[];
}
