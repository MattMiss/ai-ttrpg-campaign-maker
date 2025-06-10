import Groq from "groq-sdk";
import type { CampaignInput, CampaignResult, CampaignSession, CampaignNPC } from "../types/Campaign";
import { generateCampaignPrompt, generateNpcEditPrompt } from "./aiPrompts";

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export const getCampaignFromGroq = async (input: CampaignInput): Promise<CampaignResult> => {
  const prompt = generateCampaignPrompt(input);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  let text = completion.choices[0]?.message?.content ?? "";
  console.log(text);

  // 🔧 Strip markdown code block if present
  if (text.startsWith("```json") || text.startsWith("```")) {
    text = text.replace(/^```json|^```|```$/g, "").trim();
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("AI returned invalid JSON.");
  }
};

// Generate an NPC edit from a natural language instruction and full campaign data
export const getNpcEditFromGroq = async (
  campaign: CampaignResult,
  npcId: string,
  instruction: string
): Promise<{
  sessions?: CampaignSession[];
  npcs?: CampaignNPC[];
}> => {
  const prompt = generateNpcEditPrompt(campaign, npcId, instruction);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  let text = completion.choices[0]?.message?.content ?? "";
  console.log("[NPC Edit Response]", text);

  if (text.startsWith("```json") || text.startsWith("```")) {
    text = text.replace(/^```json|^```|```$/g, "").trim();
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("AI returned invalid JSON for NPC edit.");
  }
};