import { useState } from "react";
import type { CampaignSession } from "../../types/Campaign";
import ModalContainer from "./ModalContainer";
import { useCampaign } from "../../context/CampaignContext";

interface Props {
    sessions: CampaignSession[];
    onClose: () => void;
}

const AddSessionModal = ({ sessions, onClose }: Props) => {
    const { handleAddSession } = useCampaign();
    const [anchorId, setAnchorId] = useState(
        sessions[sessions.length - 1]?.id || ""
    );
    const [position, setPosition] = useState<"before" | "after">("after");
    const [instruction, setInstruction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!anchorId || !instruction.trim()) return;
        setLoading(true);
        setError(null);

        try {
            await handleAddSession(anchorId, instruction, position);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to apply AI edit.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContainer onBGClicked={onClose}>
            <h2 className="text-xl font-bold mb-4 text-black">
                Add New Session
            </h2>

            <label className="block font-semibold text-black mb-2">
                Insert:
            </label>
            <select
                value={position}
                onChange={(e) =>
                    setPosition(e.target.value as "before" | "after")
                }
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-4"
            >
                <option value="before">Before</option>
                <option value="after">After</option>
            </select>

            <label className="block font-semibold text-black mb-2">
                Session:
            </label>
            <select
                value={anchorId}
                onChange={(e) => setAnchorId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-4"
            >
                {sessions.map((s) => (
                    <option key={s.id} value={s.id}>
                        Session {s.number}: {s.title}
                    </option>
                ))}
            </select>

            <label className="block font-semibold text-black mb-2">
                Instruction for the AI:
            </label>
            <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded h-24 mb-4"
                placeholder="Describe what you want added in this new session..."
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded text-black dark:text-white"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Adding New Session..." : "Add Session"}
                </button>
            </div>
        </ModalContainer>
    );
};

export default AddSessionModal;
