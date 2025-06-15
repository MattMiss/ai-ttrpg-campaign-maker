// utils/mergeCampaignUpdate.ts
import type {
    CampaignResult,
    CampaignSession,
    CampaignNPC,
} from "../types/Campaign";

interface PartialUpdate {
    sessions?: CampaignSession[];
    npcs?: CampaignNPC[];
    summary?: string;
}

export const mergeCampaignUpdate = (
    original: CampaignResult,
    update: PartialUpdate & { deletedSessionIds?: string[] }
): CampaignResult => {
    const sessionMap = new Map<string, CampaignSession>(
        original.sessions.map((s) => [s.id, s])
    );
    update.sessions?.forEach((s) => sessionMap.set(s.id, s));
    update.deletedSessionIds?.forEach((id) => sessionMap.delete(id));

    const npcMap = new Map<string, CampaignNPC>(
        original.npcs.map((n) => [n.id, n])
    );
    update.npcs?.forEach((n) => npcMap.set(n.id, n));

    return {
        ...original,
        summary: update.summary ?? original.summary,
        sessions: Array.from(sessionMap.values()).sort(
            (a, b) => a.number - b.number
        ),
        npcs: Array.from(npcMap.values()),
    };
};
