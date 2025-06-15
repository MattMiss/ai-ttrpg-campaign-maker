import { useState } from "react";
import ModalContainer from "./ModalContainer";

interface DownloadCampaignModalProps {
    campaignTitle: string;
    onDownload: (filename: string) => void;
    onClose: () => void;
}

const DownloadCampaignModal = ({
    campaignTitle,
    onDownload,
    onClose,
}: DownloadCampaignModalProps) => {
    const [filename, setFilename] = useState(campaignTitle);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = () => {
        const safeName = filename.trim();
        if (safeName && safeName.length > 0) {
            onDownload(safeName);
            setError(null);
        }else{
            setError("Filename cannot be empty");
        }
    };

    return (
        <ModalContainer onBGClicked={onClose}>
            <div>
                <h2 className="text-xl font-bold mb-4">Enter filename for download</h2>

                <label className="block font-medium text-gray-700 mb-1">
                    Filename
                </label>
                <input
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                {error && <div className="mt-1 font-bold text-red-500">{error}</div>}

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Download
                    </button>
                </div>
            </div>
        </ModalContainer>
    );
};

export default DownloadCampaignModal;
