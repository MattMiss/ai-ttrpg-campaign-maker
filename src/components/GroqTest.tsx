import { useState } from "react";
import { getCampaignResponse } from "../api/groqService";
import type { CampaignInput } from "../types/Campaign";

const GroqComponent = (campaignInput: CampaignInput) => {
  const [response, setResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleGetGroqResponse = async () => {
    try {
      setIsThinking(true);
      const result = await getCampaignResponse(campaignInput);   
      setResponse(result);
    }catch (error) {
      console.log(error);
    }finally {
      setIsThinking(false);
    }   
  }

  return (
    <div className="p-4">
      <button onClick={handleGetGroqResponse}>Get Response</button>
      <h1 className="text-xl font-bold">Groq Response:</h1>
      {isThinking && <p>Thinking...</p>}
      {!isThinking && <pre className="mt-2 whitespace-pre-wrap">{response}</pre>}
    </div>
  );
};

export default GroqComponent;
