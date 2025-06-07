import Groq from "groq-sdk";
import type { CampaignInput, CampaignResult } from "../types/Campaign";
import { generateCampaignPrompt } from "./aiPrompts";

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