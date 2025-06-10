import type { CampaignInput, CampaignResult } from "../types/Campaign";

export const generateCampaignPrompt = (input: CampaignInput): string => {
  return `
Create a TTRPG campaign in the ${input.genre} genre.

The campaign should be ${input.length} sessions long.

Story Beats:
${input.beats.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Respond in JSON format with:
{
  "title": string,
  "summary": string,
  "sessions": [
    { "id": string, "number": number, "title": string, "summary": string, "events": string[], "npcs": string[] }
  ],
  "npcs": [
    { "id": string, "name": string, "role": string, "alive": boolean, "firstAppearsIn": number, "notes"?: string }
  ]
}
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