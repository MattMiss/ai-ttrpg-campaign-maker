import { useState } from "react";
import ModalContainer from "./ModalContainer";
import { useCampaign } from "../../context/CampaignContext";

interface Props {
    onClose: () => void;
}

const AddNpcModal = ({ onClose }: Props) => {
    const { handleAddNpc } = useCampaign();
    const [instruction, setInstruction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!instruction.trim()) return;
        setLoading(true);
        setError(null);

        try {
            await handleAddNpc(instruction);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to add NPC.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContainer onBGClicked={onClose}>
            <h2 className="text-xl font-bold mb-4 text-black">Add New NPC</h2>

            <label className="block font-semibold text-black mb-2">
                Instruction for the AI:
            </label>
            <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded h-24 mb-4"
                placeholder="Describe who the NPC is, what their role is, and where they should be added (if applicable)..."
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="bg-gray-600 px-4 py-2 rounded text-white"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Adding NPC..." : "Add NPC"}
                </button>
            </div>
        </ModalContainer>
    );
};

export default AddNpcModal;
