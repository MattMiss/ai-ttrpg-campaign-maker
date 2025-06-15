// types/Campaign.ts

export interface CampaignInput {
    genre: string;
    length: number;
    beats: string[];
}

export interface Campaign {
    id: string;
    title: string;
    genre: string;
    length: number;
    summary: string;
    beats: StoryBeat[];
    sessions: CampaignSession[];
    npcs: CampaignNPC[];
}

export interface StoryBeat {
    id: string;
    description: string;
    sessionNum?: number;
}

export interface CampaignSession {
    id: string;
    number: number;
    title: string;
    summary: string;
    events: string[];
    npcs: string[]; // NPC ids
}

export interface CampaignNPC {
    id: string;
    name: string;
    role: string;
    alive: boolean;
    notes?: string;
    firstAppearsIn?: number;
    isBBEG?: boolean;
}

export interface CampaignResult {
    id: string;
    title: string;
    summary: string;
    sessions: CampaignSession[];
    npcs: CampaignNPC[];
}
