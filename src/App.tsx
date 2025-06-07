// App.tsx
import { useEffect, useState } from "react";
import CampaignForm from "./components/CampaignForm";
import type { CampaignInput } from "./types/Campaign";

const App = () => {
  const [campaignData, setCampaignData] = useState<CampaignInput | null>(null);

  useEffect(() => {
    console.log(campaignData);
  }, [campaignData])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {!campaignData ? (
        <CampaignForm onSubmit={setCampaignData} />
      ) : (
        <pre className="bg-white p-4 rounded shadow whitespace-pre-wrap">
          {JSON.stringify(campaignData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default App;
