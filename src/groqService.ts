import Groq from "groq-sdk";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });

export async function groqTest() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}