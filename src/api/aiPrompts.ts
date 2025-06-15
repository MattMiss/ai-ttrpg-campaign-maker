import type { CampaignInput, CampaignResult } from "../types/Campaign";

export const generateCampaignPrompt = (input: CampaignInput): string => {
    return `
You are an AI Game Master creating a structured TTRPG campaign.

**Genre:** ${input.genre}  
**Length:** ${input.length} sessions  
**Story Beats:**  
${input.beats.map((b, i) => `${i + 1}. ${b}`).join("\n")}

### Requirements:

1. Structure the story across ${
        input.length
    } sessions with a continuous narrative.
2. Ensure the sessions reflect the provided story beats in order.
3. Introduce NPCs organically throughout the sessions and maintain consistency.
4. Each session must include:
 - A unique "id" (e.g., "session1")
 - A session "number" (starting at 1)
 - A "title"
 - A **summary that clearly explains the major events in that session**.  
   - The summary should mention all key events, what decisions or conflicts happened, and their outcomes.
   - Avoid overly short or vague summaries — each should be at least 3–5 sentences.
   - **If an NPC appears in the summary, use their full name, not their ID**
 - A list of short "events" (as strings)
 - A list of relevant NPC IDs who are actively involved in the events of this session. Only include NPCs who appear or take part in the described events. Do not include NPCs who are not mentioned in the session summary or events.

5. Define an array of NPCs:
 - Each must include an "id", "name", "role", "alive" (boolean), and "firstAppearsIn" (session number)
 - Optionally include a "notes" field for backstory, personality, or relationships
 - **All NPCs listed in sessions must exist in this list**
 - **NPC IDs must follow the format "npc-1", "npc-2", etc., and must not change even if their names or roles are edited later**

6. At least one NPC must be a central villain or antagonist (BBEG - Big Bad Evil Guy/Gal/Group). This NPC must:
- Have "isBBEG": true in their JSON object
- Be clearly described in their "role"
- Appear in at least one session
- Be included in the npcs array and referenced by ID in relevant sessions

### Output Format:
{
"title": string,
"summary": string,
"sessions": [
  {
    "id": string,
    "number": number,
    "title": string,
    "summary": string, // rich, detailed, story-driven
    "events": string[],
    "npcs": string[] // IDs of NPCs actually involved in this session's events
  }
],
"npcs": [
  {
    "id": string, // e.g., "npc-1"
    "name": string,
    "role": string,
    "alive": boolean,
    "firstAppearsIn": number,
    "notes"?: string.
    "isBBEG"?: boolean,
  }
]
}

Respond only with valid JSON.
`.trim();
};

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

Update the campaign based on this change. If necessary:
- Update future sessions to reflect changes involving this NPC
- Remove or replace events they are no longer part of
- Adjust their role, status, or other relevant fields
- If the NPC is the BBEG, ensure their central story impact is reflected
- Update the overall campaign **summary** if this NPC plays a significant role in the story arc

Return only the updated parts of the campaign in valid JSON format:
{
"summary": "Updated campaign summary if needed",
"sessions": [ ... updated sessions only ... ],
"npcs": [ ... updated NPC entry only ... ]
}
`.trim();
};


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

Return only updated sessions, affected NPCs, and a new campaign summary (if it changed) in valid JSON format:

{
"summary"?: string,            // Include only if the campaign summary changed
"sessions": [ ... updated session only ... ],
"npcs": [ ... any affected NPCs ... ]
}
`.trim();
};
