// App.tsx
import { useState } from "react";
import CampaignSelector from "./components/CampaignSelector";
import CampaignForm from "./components/CampaignForm";
import CampaignViewer from "./components/CampaignViewer";
import Navbar, { type ViewType } from "./components/Navbar";
import { useCampaign } from "./context/CampaignContext";
import type { CampaignInput } from "./types/Campaign";

const App = () => {
    const {
        generateCampaign,
        generating,
        error,
        campaignResult,
    } = useCampaign();
    const [view, setView] = useState<ViewType>("create");

    const handleGenerateCampaign = (data: CampaignInput) => {
        generateCampaign(data, () => {
            setView("view");
        });
    };

    return (
        <>
            <Navbar currentView={view} onChangeView={setView} />

            <div className="w-full p-6 max-w-3xl mx-auto">
                {view === "create" && (
                    <>
                        {generating ? (
                            <div className="flex justify-center items-center gap-4 mt-4 text-2xl text-white">
                                <div
                                    className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin"
                                    role="status"
                                    aria-label="Loading"
                                ></div>
                                <span>Generating campaign</span>
                            </div>
                        ) : (
                            <CampaignForm onSubmit={handleGenerateCampaign} />
                        )}
                        {error && <p className="text-red-600 mt-4">{error}</p>}
                    </>
                )}

                {view === "view" && (
                    <>
                        <CampaignSelector />
                        {campaignResult ? (
                            <CampaignViewer />
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
