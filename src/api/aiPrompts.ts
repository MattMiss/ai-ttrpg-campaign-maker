import type { CampaignInput } from "../types/Campaign";

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