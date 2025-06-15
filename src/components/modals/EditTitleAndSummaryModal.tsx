import { useState } from "react";
import ModalContainer from "./ModalContainer";

interface EditTitleAndSummaryModalProps {
    currentTitle: string;
    currentSummary: string;
    onSave: (newTitle: string, newSummary: string) => void;
    onClose: () => void;
}

const EditTitleAndSummaryModal = ({
    currentTitle,
    currentSummary,
    onSave,
    onClose,
}: EditTitleAndSummaryModalProps) => {
    const [title, setTitle] = useState(currentTitle);
    const [summary, setSummary] = useState(currentSummary);

    const handleSave = () => {
        const trimmedTitle = title.trim();
        const trimmedSummary = summary.trim();
        if (trimmedTitle) {
            onSave(trimmedTitle, trimmedSummary);
        }
    };

    return (
        <ModalContainer onBGClicked={onClose}>
            <div>
                <h2 className="text-xl font-bold mb-4">Edit Campaign Info</h2>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-4"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Summary
                </label>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-6"
                    rows={4}
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </ModalContainer>
    );
};

export default EditTitleAndSummaryModal;
