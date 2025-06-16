import type { CampaignResult } from "../../types/Campaign";

/**
 * Generates a prompt instructing the AI to edit a specific session within the campaign.
 * 
 * This includes:
 * - Updating the session summary, events, and involved NPCs
 * - Modifying related NPCs if their involvement or attributes change
 * - Optionally updating the campaign summary if major events are altered
 * - Allowing for session deletion by returning a "deletedSessionIds" array
 * 
 * The prompt ensures that the session and overall story maintain continuity.
 *
 * @param campaign - The full campaign data to provide story context
 * @param sessionId - The ID of the session to be edited
 * @param instruction - Natural language instruction describing the desired changes
 * @returns A formatted prompt string to guide the AI in editing the session
 */
export const generateSessionEditPrompt = (
    campaign: CampaignResult,
    sessionId: string,
    instruction: string
): string => {
    const jsonCampaign = JSON.stringify(campaign, null, 2);

    return `
You are an AI campaign editor for a TTRPG.

Below is the full campaign data:
${jsonCampaign}

Focus on the session with ID "${sessionId}".

Instruction:
${instruction}

Make all necessary changes to that session, including:
- Updating the session "summary" to reflect any changes to events or NPCs
- Ensuring the session "npcs" list only includes NPCs actively involved in that session's events
- Adjusting any related NPCs if their appearance or role changes
- If the overall campaign summary needs to be revised to reflect major changes, return an updated version

Maintain continuity in the overall story.

If a session needs to be removed, include its ID in a "deletedSessionIds" array.

DO NOT include any explanation or formatting text before or after the JSON. Return only the updated parts of the campaign in valid JSON format:
{
"summary"?: string,            // Include only if the campaign summary changed
"sessions": [ ... updated session only ... ],
"npcs": [ ... any affected NPCs ... ],
"deletedSessionIds"?: [ ... any deleted session ids ... ]
}
`.trim();
};

/**
 * Generates a prompt instructing the AI to insert a new session into the campaign.
 * 
 * The AI is provided with the current campaign structure and a reference session ID.
 * It is instructed to:
 * - Add a new session either before or after the anchor session
 * - Adjust session numbers to maintain correct order
 * - Create a new session with a unique ID, title, summary, events, and NPC references
 * - Optionally introduce new NPCs as needed in the session
 * - Update the overall campaign summary if the story arc changes significantly
 * 
 * @param campaign - The current campaign state
 * @param anchorSessionId - The session ID to insert before or after
 * @param instruction - Natural language instruction describing the session to be added
 * @param position - Placement of the new session relative to the anchor ("before" or "after")
 * @returns A formatted prompt string to guide the AI in inserting the session
 */
export const generateAddSessionPrompt = (
    campaign: CampaignResult,
    anchorSessionId: string,
    instruction: string,
    position: "before" | "after"
): string => {
    const jsonCampaign = JSON.stringify(campaign, null, 2);
    const anchorSession = campaign.sessions.find(
        (s) => s.id === anchorSessionId
    );
    const insertNumber = anchorSession
        ? position === "before"
            ? anchorSession.number
            : anchorSession.number + 1
        : campaign.sessions.length + 1;

    return `
You are an AI campaign editor for a TTRPG.

Below is the current campaign data:
${jsonCampaign}

Instruction:
${instruction}

Your task is to insert a **new session** ${position.toUpperCase()} **Session ${
        anchorSession?.number ?? "N/A"
    } ("${anchorSession?.title ?? "Unknown"}")**.

Requirements for the new session:
- The session must logically fit into the story ${position} the anchor session.
- Insert it **at position ${insertNumber}** in the campaign. Adjust the "number" of all subsequent sessions to maintain correct order.
- Use a unique "id" like "session${insertNumber}".
- Include:
- a "title"
- a detailed "summary" (3–5 sentences minimum)
- a list of key "events"
- an array of involved NPC IDs ("npcs")
- If new NPCs are introduced, define them with:
- "id"
- "name"
- "role"
- "alive"
- "firstAppearsIn": session number
- optional "notes"
- If the story arc significantly changes, return an updated campaign "summary".

DO NOT include any explanation or formatting text before or after the JSON. Return only the updated parts of the campaign in valid JSON format:
{
"summary"?: string,
"sessions": [ ...new and updated sessions... ],
"npcs"?: [ ...new or modified NPCs... ]
}
`.trim();
};
