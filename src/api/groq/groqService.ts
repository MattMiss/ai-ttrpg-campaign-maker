import type {
    CampaignInput,
    CampaignResult,
    CampaignSession,
    CampaignNPC,
} from "../../types/Campaign";

import { generateCampaignPrompt } from "../prompts/campaignPrompts";
import {
    generateAddSessionPrompt,
    generateSessionEditPrompt,
} from "../prompts/sessionPrompts";
import {
    generateAddNpcPrompt,
    generateNpcEditPrompt,
} from "../prompts/npcPrompts";
import { runGroqCompletion } from "./groq.helper";

/**
 * Generates a full campaign based on user input and returns structured campaign data.
 * @param input - User-defined campaign preferences and settings.
 * @returns A complete CampaignResult object including summary, sessions, and NPCs.
 */
export const getCampaignFromGroq = async (
    input: CampaignInput
): Promise<CampaignResult> => {
    const prompt = generateCampaignPrompt(input);
    const text = await runGroqCompletion(prompt);
    return JSON.parse(text);
};

/**
 * Sends an instruction to modify an existing NPC in the campaign.
 * The AI may also update sessions that include this NPC.
 * @param campaign - The current full campaign object.
 * @param npcId - The ID of the NPC to modify.
 * @param instruction - A natural language command to modify the NPC.
 * @returns Any updated NPCs and sessions returned by the AI.
 */
export const getNpcEditFromGroq = async (
    campaign: CampaignResult,
    npcId: string,
    instruction: string
): Promise<{
    sessions?: CampaignSession[];
    npcs?: CampaignNPC[];
}> => {
    const prompt = generateNpcEditPrompt(campaign, npcId, instruction);
    const text = await runGroqCompletion(prompt);
    return JSON.parse(text);
};

/**
 * Sends an instruction to modify an existing session in the campaign.
 * The AI may also update relevant NPCs if their involvement in the session changes.
 * @param campaign - The current full campaign object.
 * @param sessionId - The ID of the session to modify.
 * @param instruction - A natural language command to modify the session.
 * @returns Any updated sessions and NPCs returned by the AI.
 */
export const getSessionEditFromGroq = async (
    campaign: CampaignResult,
    sessionId: string,
    instruction: string
): Promise<{
    sessions?: CampaignSession[];
    npcs?: CampaignNPC[];
}> => {
    const prompt = generateSessionEditPrompt(campaign, sessionId, instruction);
    const text = await runGroqCompletion(prompt);
    return JSON.parse(text);
};

/**
 * Sends a request to the AI to generate a new session, placed before or after a given anchor session.
 * The AI may also adjust other sessions or introduce new NPCs to maintain story continuity.
 * @param campaign - The current full campaign object.
 * @param anchorSessionId - The session ID to insert the new session near.
 * @param instruction - Description of what the new session should include.
 * @param position - Whether to insert the session "before" or "after" the anchor.
 * @returns The new session and any affected NPCs or updated sessions.
 */
export const addNewSessionWithGroq = async (
    campaign: CampaignResult,
    anchorSessionId: string,
    instruction: string,
    position: "before" | "after"
): Promise<{
    sessions?: CampaignSession[];
    npcs?: CampaignNPC[];
}> => {
    const prompt = generateAddSessionPrompt(
        campaign,
        anchorSessionId,
        instruction,
        position
    );
    const text = await runGroqCompletion(prompt);
    return JSON.parse(text);
};

/**
 * Sends a request to the AI to create a brand new NPC and insert them into the appropriate place in the campaign.
 * The AI may also update sessions to include the new NPC if needed.
 * @param campaign - The current full campaign object.
 * @param instruction - A description of the NPC to add (role, traits, etc.).
 * @returns The new NPC and any updated sessions that reference the NPC.
 */
export const addNewNPCWithGroq = async (
    campaign: CampaignResult,
    instruction: string
): Promise<{
    sessions?: CampaignSession[];
    npcs?: CampaignNPC[];
}> => {
    const prompt = generateAddNpcPrompt(campaign, instruction);
    const text = await runGroqCompletion(prompt);
    return JSON.parse(text);
};
