import { useState } from "react";
import { useCampaign } from "../../context/CampaignContext";
import type { CampaignSession } from "../../types/Campaign";
import ModalContainer from "./ModalContainer";

interface SessionEditModalProps {
    session: CampaignSession;
    onClose: () => void;
}

const SessionEditModal = ({ session, onClose }: SessionEditModalProps) => {
    const { handleSessionChange } = useCampaign();
    const [instruction, setInstruction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!instruction.trim()) return;
        setLoading(true);
        setError(null);

        try {
            await handleSessionChange(session.id, instruction);
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
            <h2 className="text-xl font-bold">
                Edit for Session {session.number}: {session.title}
            </h2>

            <p className="mt-4 text-gray-700">{session.summary}</p>

            <div className="mt-4">
                <strong className="block text-sm text-gray-600 mt-2">
                    Events:
                </strong>
                <ul className="list-disc list-inside text-sm text-gray-800 mt-1">
                    {session.events.map((event, i) => (
                        <li key={i}>{event}</li>
                    ))}
                </ul>
            </div>

            <label className="block mt-4">
                <strong>Instruction for AI:</strong>
                <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="e.g. Change this session to introduce an alien diplomat"
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

export default SessionEditModal;
