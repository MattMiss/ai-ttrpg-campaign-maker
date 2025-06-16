import type { CampaignResult } from "../../types/Campaign";

/**
 * Generates a prompt for editing an existing NPC within the campaign.
 *
 * This prompt instructs the AI to update, modify, or delete the specified NPC
 * from the campaign. The AI is also expected to reflect the changes across all
 * sessions and the campaign summary if the NPC is significant to the story arc.
 *
 * If the NPC is marked as deleted by the instruction, the prompt specifies that:
 * - The NPC should be omitted from the "npcs" array
 * - The NPC ID should be removed from all relevant sessions
 * - A "deletedNpcId" field should be included with the removed ID
 *
 * @param campaign - The full campaign object containing sessions and NPCs
 * @param npcId - The ID of the NPC to edit or remove
 * @param instruction - Natural language instruction describing the desired change
 * @returns A formatted prompt string to be passed to the AI for processing
 */
export const generateNpcEditPrompt = (
    campaign: CampaignResult,
    npcId: string,
    instruction: string
): string => {
    const jsonCampaign = JSON.stringify(campaign, null, 2);
    const isBbeg = campaign.npcs.find((n) => n.id === npcId)?.isBBEG ?? false;

    return `
You are an AI campaign editor for a TTRPG.

Below is the full campaign data:
${jsonCampaign}

Focus on the NPC with ID "${npcId}". This NPC is${
        isBbeg ? "" : " not"
    } the Big Bad Evil Guy (BBEG).

Instruction:
${instruction}

Apply the instruction to the campaign. You may:
- Update the NPC’s attributes (name, role, alive, etc.)
- Remove this NPC completely (if instructed)
- Update sessions where this NPC is involved
- Update the campaign summary if this NPC affects the main arc

If the NPC is **deleted**, you must:
- Omit them from the "npcs" array
- Remove references to their ID from all session "npcs" arrays
- include its ID in a "deletedNpcId" field.

DO NOT include any explanation or formatting text before or after the JSON. Return only the updated parts of the campaign in valid JSON format:
{
"summary": "Updated campaign summary if needed",
"sessions": [ ... updated sessions only ... ],
"npcs": [ ... updated NPC entry only ... ],
"deletedNpcId"?: string // Include if the NPC was removed
}
`.trim();
};

/**
 * Generates a prompt for adding a new NPC to the campaign.
 *
 * This prompt instructs the AI to create a new NPC based on user instruction
 * and optionally update sessions and the campaign summary where this new NPC appears.
 *
 * The AI must:
 * - Generate a unique "npc-#" ID based on the existing sequence
 * - Create a fitting name, role, and other attributes for the new NPC
 * - Decide which session they first appear in (or follow user instruction)
 * - Update only the relevant sessions to include this new NPC
 *
 * @param campaign - The full campaign object to analyze and modify
 * @param instruction - Natural language instruction from the user describing the NPC to add
 * @returns A prompt string for the AI to add a new NPC and update the campaign accordingly
 */
export const generateAddNpcPrompt = (
    campaign: CampaignResult,
    instruction: string
): string => {
    const jsonCampaign = JSON.stringify(campaign, null, 2);

    return `
You are an AI campaign editor for a TTRPG.

Below is the current campaign data:
${jsonCampaign}

Instruction:
${instruction}

Your task is to add a **new NPC** to the campaign based on the user's instruction.

### Requirements:
- Create a new NPC with:
  - "id": use the next available ID in the format "npc-#", continuing the existing sequence
  - "name": generate a fitting name
  - "role": describe their job, personality, or importance in the story
  - "alive": boolean
  - "firstAppearsIn": session number (decide based on story context or user instruction)
  - Optional: "notes" for personality, relationships, or appearance
  - Optional: "isBBEG": true if the user intends this NPC to be a main antagonist
- Modify **only the sessions** where this NPC appears. Add the NPC's ID to the session's "npcs" array and mention them in the "events" or "summary" if appropriate.
- If the campaign summary needs to reflect this change, return a new summary.

### Output:
Respond ONLY with valid JSON in this format:

{
  "summary"?: string,
  "sessions": [ ... any updated sessions ... ],
  "npcs": [ ...new NPC only... ]
}

DO NOT include any explanation or markdown. Only return the JSON.
`.trim();
};
