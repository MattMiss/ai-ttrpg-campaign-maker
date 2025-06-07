import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { CampaignInput, CampaignResult } from "../types/Campaign";
import { getCampaignFromGroq } from "../api/groqService";
import { testData } from "../data/testData";

interface CampaignContextValue {
    input: CampaignInput | null;
    campaignResult: CampaignResult | null;
    loading: boolean;
    error: string | null;
    generateCampaign: (input: CampaignInput) => Promise<void>;
    clearCampaign: () => void;
}

const CampaignContext = createContext<CampaignContextValue | undefined>(
    undefined
);

export const useCampaign = (): CampaignContextValue => {
    const context = useContext(CampaignContext);
    if (!context)
        throw new Error("useCampaign must be used within CampaignProvider");
    return context;
};

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
    const [input, setInput] = useState<CampaignInput | null>(() => {
        const stored = localStorage.getItem("campaignInput");
        return stored ? JSON.parse(stored) : null;
    });
    const [campaignResult, setCampaignResult] = useState<CampaignResult | null>(
        () => {
            const stored = localStorage.getItem("campaignResult");
            return stored ? JSON.parse(stored) : testData;
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (input) localStorage.setItem("campaignInput", JSON.stringify(input));
        if (campaignResult)
            localStorage.setItem(
                "campaignResult",
                JSON.stringify(campaignResult)
            );
    }, [input, campaignResult]);

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

    const clearCampaign = () => {
        setInput(null);
        setCampaignResult(null);
        localStorage.removeItem("campaignInput");
        localStorage.removeItem("campaignResult");
    };

    return (
        <CampaignContext.Provider
            value={{ input, campaignResult, loading, error, generateCampaign, clearCampaign }}
        >
            {children}
        </CampaignContext.Provider>
    );
};
