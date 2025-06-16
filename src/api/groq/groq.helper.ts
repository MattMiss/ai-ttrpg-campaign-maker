// helpers/groqHelpers.ts
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const runGroqCompletion = async (prompt: string): Promise<string> => {
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
    });

    return cleanGroqResponse(completion.choices[0]?.message?.content ?? "");
};

export const cleanGroqResponse = (text: string): string => {
    if (text.startsWith("```json") || text.startsWith("```")) {
        return text.replace(/^```json|^```|```$/g, "").trim();
    }
    return text.trim();
};
