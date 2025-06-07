import { useCampaign } from "../context/CampaignContext";

const CampaignSelector = () => {
    const { campaigns, selectedId, selectCampaign } = useCampaign();

    if (campaigns.length === 0) return null;

    return (
        <div className="bg-white rounded p-4 mb-4">
            <label className="block font-semibold mb-1">
                Load Existing Campaign:
            </label>
            <select
                value={selectedId ?? ""}
                onChange={(e) => selectCampaign(e.target.value)}
                className="border p-2 rounded w-full"
            >
                <option value="">Select a campaign...</option>
                {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CampaignSelector;
