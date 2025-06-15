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
 - All NPCs listed in sessions must exist in this list

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
    "id": string,
    "name": string,
    "role": string,
    "alive": boolean,
    "firstAppearsIn": number,
    "notes"?: string
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

    return `
You are an AI campaign editor for a TTRPG.

Below is the full campaign data:
${jsonCampaign}

Focus on the NPC with ID "${npcId}".

Instruction:
${instruction}

Update the campaign based on this change. If necessary, update future sessions, remove or replace events involving this NPC, or adjust their status or role.

Return only updated sessions and NPCs in valid JSON format:
{
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

Make necessary changes to that session and adjust any related NPCs if needed. Maintain continuity in the overall story.

Return only updated sessions and NPCs in valid JSON format:
{
  "sessions": [ ... updated session only ... ],
  "npcs": [ ... any affected NPCs ... ]
}
`.trim();
};
