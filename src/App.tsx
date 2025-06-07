// App.tsx
import { useState } from "react";
import CampaignSelector from "./components/CampaignDropdown";
import CampaignForm from "./components/CampaignForm";
import CampaignViewer from "./components/CampaignViewer";
import Navbar, {type ViewType } from "./components/Navbar";
import { useCampaign } from "./context/CampaignContext";

const App = () => {
    const { generateCampaign, loading, error, campaignResult, clearCampaign } =
        useCampaign();
	const [view, setView] = useState<ViewType>("create");

    return (
        <>
            <Navbar currentView={view} onChangeView={setView} />

            <div className="w-full p-6 max-w-3xl mx-auto">
                {view === "create" && (
                    <>
                        <CampaignForm onSubmit={generateCampaign} />
                        {loading && (
                            <p className="text-blue-600 mt-4">
                                Generating campaign...
                            </p>
                        )}
                        {error && <p className="text-red-600 mt-4">{error}</p>}
                    </>
                )}

                {view === "view" && (
                    <>
                        <CampaignSelector />
                        {campaignResult ? (
                            <>
                                <CampaignViewer />
                                <button
                                    onClick={clearCampaign}
                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Reset Campaign
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-600 mt-4">
                                No campaign selected.
                            </p>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default App;
