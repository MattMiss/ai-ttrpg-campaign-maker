// components/SessionEditModal.tsx
import { useState } from "react";
import type { CampaignSession } from "../types/Campaign";

interface Props {
    session: CampaignSession;
    onSave: (updated: CampaignSession) => void;
    onClose: () => void;
}

const SessionEditModal = ({ session, onSave, onClose }: Props) => {
    const [summary, setSummary] = useState(session.summary);
    const [events, setEvents] = useState(session.events.join("\n"));

    const handleSave = () => {
        const updated = {
            ...session,
            summary,
            events: events
                .split("\n")
                .map((e) => e.trim())
                .filter(Boolean),
        };
        onSave(updated);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg space-y-4">
                <h2 className="text-xl font-bold">
                    Edit Session {session.number}: {session.title}
                </h2>

                <label className="block">
                    Summary:
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="w-full border p-2 mt-1"
                    />
                </label>

                <label className="block">
                    Events (one per line):
                    <textarea
                        value={events}
                        onChange={(e) => setEvents(e.target.value)}
                        className="w-full border p-2 mt-1"
                    />
                </label>

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
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionEditModal;
