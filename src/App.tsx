// App.tsx
import CampaignForm from "./components/CampaignForm";
import CampaignViewer from "./components/CampaignViewer";
import { useCampaign } from "./context/CampaignContext";

const App = () => {
    const { generateCampaign, loading, error, campaignResult, clearCampaign } =
        useCampaign();

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {!campaignResult ? (
                <CampaignForm onSubmit={generateCampaign} />
            ) : (
                <>
                    <CampaignViewer />
                    <button
                        onClick={clearCampaign}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Reset Campaign
                    </button>
                </>
            )}
            {loading && (
                <p className="text-blue-600 mt-4">Generating campaign...</p>
            )}
            {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
    );
};

export default App;
