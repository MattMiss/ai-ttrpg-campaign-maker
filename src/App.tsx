import { useEffect, useState } from "react";
import { groqTest } from "./groqService";

const GroqComponent = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const runGroq = async () => {
      const result = await groqTest();
      setResponse(result);
    };
    runGroq();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Groq Response:</h1>
      <pre className="mt-2 whitespace-pre-wrap">{response}</pre>
    </div>
  );
};

export default GroqComponent;
