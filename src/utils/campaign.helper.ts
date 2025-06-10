// utils/mergeCampaignUpdate.ts
import type {
    CampaignResult,
    CampaignSession,
    CampaignNPC,
} from "../types/Campaign";

interface PartialUpdate {
    sessions?: CampaignSession[];
    npcs?: CampaignNPC[];
}

export const mergeCampaignUpdate = (
    original: CampaignResult,
    update: PartialUpdate
): CampaignResult => {
    // Replace or keep original sessions
    const sessionMap = new Map<string, CampaignSession>(
        original.sessions.map((s) => [s.id, s])
    );
    update.sessions?.forEach((s) => sessionMap.set(s.id, s));

    // Replace or keep original NPCs
    const npcMap = new Map<string, CampaignNPC>(
        original.npcs.map((n) => [n.id, n])
    );
    update.npcs?.forEach((n) => npcMap.set(n.id, n));

    return {
        ...original,
        sessions: Array.from(sessionMap.values()).sort(
            (a, b) => a.number - b.number
        ),
        npcs: Array.from(npcMap.values()),
    };
};
