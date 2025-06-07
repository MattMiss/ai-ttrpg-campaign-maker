import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { CampaignInput, CampaignResult } from "../types/Campaign";
import { getCampaignFromGroq } from "../api/groqService";
import { CAMPAIGN_DATA_KEY, CAMPAIGN_LIST_KEY } from "../utils/storage.helper";

interface CampaignContextValue {
    input: CampaignInput | null;
    campaignResult: CampaignResult | null;
    loading: boolean;
    error: string | null;
    selectedId: string | null;
    campaigns: CampaignResult[];
    selectCampaign: (id: string) => void;
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
    const [campaigns, setCampaigns] = useState<CampaignResult[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [input, setInput] = useState<CampaignInput | null>(() => {
        const stored = localStorage.getItem("campaignInput");
        return stored ? JSON.parse(stored) : null;
    });
    const [campaignResult, setCampaignResult] = useState<CampaignResult | null>(
        () => {
            const stored = localStorage.getItem("campaignResult");
            return stored ? JSON.parse(stored) : null;
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ids = JSON.parse(
            localStorage.getItem(CAMPAIGN_LIST_KEY) || "[]"
        ) as string[];
        const loaded: CampaignResult[] = ids
            .map((id) => {
                const raw = localStorage.getItem(CAMPAIGN_DATA_KEY(id));
                return raw ? JSON.parse(raw) : null;
            })
            .filter(Boolean);
        setCampaigns(loaded);

        const lastUsedId = localStorage.getItem("selectedCampaignId");
        if (lastUsedId && loaded.some((c) => c.id === lastUsedId)) {
            setSelectedId(lastUsedId);
            setCampaignResult(loaded.find((c) => c.id === lastUsedId)!);
        }
    }, []);

    // useEffect(() => {
    //     if (input) localStorage.setItem("campaignInput", JSON.stringify(input));
    //     if (campaignResult)
    //         localStorage.setItem(
    //             "campaignResult",
    //             JSON.stringify(campaignResult)
    //         );
    // }, [input, campaignResult]);

    const generateCampaign = async (inputData: CampaignInput) => {
        setLoading(true);
        setError(null);
        setInput(inputData);

        try {
            const result = await getCampaignFromGroq(inputData);

            const id = crypto.randomUUID();
            const fullCampaign = { ...result, id };

            // Save individual campaign
            localStorage.setItem(
                CAMPAIGN_DATA_KEY(id),
                JSON.stringify(fullCampaign)
            );

            // Update campaign list
            const updated = [...campaigns, fullCampaign];
            setCampaigns(updated);
            localStorage.setItem(
                CAMPAIGN_LIST_KEY,
                JSON.stringify(updated.map((c) => c.id))
            );

            // Select new
            setSelectedId(id);
            localStorage.setItem("selectedCampaignId", id);

            setCampaignResult(fullCampaign);
        } catch (err) {
            console.error(err);
            setError("Failed to generate campaign.");
        } finally {
            setLoading(false);
        }
    };

    const selectCampaign = (id: string) => {
        const campaign = campaigns.find((c) => c.id === id);
        if (campaign) {
            setSelectedId(id);
            setCampaignResult(campaign);
            localStorage.setItem("selectedCampaignId", id);
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
            value={{
                input,
                campaignResult,
                loading,
                error,
                generateCampaign,
                clearCampaign,
                campaigns,
                selectedId,
                selectCampaign,
            }}
        >
            {children}
        </CampaignContext.Provider>
    );
};
