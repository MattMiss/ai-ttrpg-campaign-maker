import { useState } from "react";
import { useCampaign } from "../../context/CampaignContext";
import type { CampaignNPC } from "../../types/Campaign";
import ModalContainer from "./ModalContainer";

interface NpcEditModalProps {
    npc: CampaignNPC;
    onClose: () => void;
}

const NpcEditModal = ({ npc, onClose }: NpcEditModalProps) => {
    const { handleNpcChange } = useCampaign();
    const [instruction, setInstruction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!instruction.trim()) return;
        setLoading(true);
        setError(null);

        try {
            await handleNpcChange(npc.id, instruction);
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
            <h2 className="text-xl font-bold">Edit for NPC: {npc.name}</h2>

            <div className="text-sm text-gray-600 mt-2">
                <strong>Appears in Session:</strong> {npc.firstAppearsIn}
            </div>
            <div className="text-sm text-gray-600">
                <strong>Status: </strong> {npc.alive ? "Alive" : "Deceased"}
            </div>
            {npc.notes && (
                <p className="text-sm text-gray-700 mt-2">
                    <strong>Notes:</strong> {npc.notes}
                </p>
            )}

            <label className="block mt-4">
                <strong>Instruction for AI: </strong>
                <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="e.g. Kill this NPC in Session 4"
                    className="w-full border p-2 mt-1"
                    rows={4}
                />
            </label>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Apply AI Edit"}
                </button>
            </div>
        </ModalContainer>
    );
};

export default NpcEditModal;
