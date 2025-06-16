import { type CampaignInput } from "../../types/Campaign";

/**
 * Generates a structured prompt for the AI to create a complete TTRPG campaign.
 * 
 * This prompt tells the AI to generate a multi-session narrative based on the
 * provided genre, length, and user-defined story beats. It includes strict formatting
 * and content requirements to ensure consistency and usability across sessions and NPCs.
 *
 * Requirements enforced in the prompt:
 * - Each session must have a unique ID, number, title, detailed summary, event list, and relevant NPCs.
 * - NPCs must be uniquely identified, consistent across sessions, and defined with essential attributes.
 * - At least one NPC must be the central antagonist (BBEG).
 * - The AI must return only valid JSON, with no additional text or explanation.
 *
 * @param input - An object containing campaign input data including genre, length, and story beats.
 * @returns A string prompt to be used with a language model for generating campaign data.
 */
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

DO NOT include any explanation or formatting text before or after the JSON. Respond only with valid JSON.
`.trim();
};