import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampaignInput, CampaignResult } from "../types/Campaign";
import { getCampaignFromGroq } from "../api/groqService";
import { testData } from "../data/testData";

interface CampaignContextValue {
  input: CampaignInput | null;
  campaignResult: CampaignResult | null;
  loading: boolean;
  error: string | null;
  generateCampaign: (input: CampaignInput) => Promise<void>;
}

const CampaignContext = createContext<CampaignContextValue | undefined>(undefined);

export const useCampaign = (): CampaignContextValue => {
  const context = useContext(CampaignContext);
  if (!context) throw new Error("useCampaign must be used within CampaignProvider");
  return context;
};

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState<CampaignInput | null>(null);
  const [campaignResult, setCampaignResult] = useState<CampaignResult | null>(testData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCampaign = async (data: CampaignInput) => {
    setLoading(true);
    setError(null);
    setInput(data);

    try {
      const campaign = await getCampaignFromGroq(data);
      setCampaignResult(campaign);
    } catch (err) {
      setError("Failed to generate campaign.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CampaignContext.Provider value={{ input, campaignResult, loading, error, generateCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};
