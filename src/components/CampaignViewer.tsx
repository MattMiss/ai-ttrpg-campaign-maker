// components/CampaignViewer.tsx
import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import type { CampaignSession, CampaignNPC } from "../types/Campaign";
import NpcEditModal from "./NpcEditModal";

const CampaignViewer = () => {
    const { campaignResult } = useCampaign();
	const [editingNpc, setEditingNpc] = useState<CampaignNPC | null>(null);
    //const [editingSession, setEditingSession] = useState<CampaignSession | null>(null);

    if (!campaignResult) return null;

    return (
        <div className="space-y-8 mt-6">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-3xl font-bold mb-2">
                    {campaignResult.title}
                </h2>
                <p className="text-gray-700">{campaignResult.summary}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl font-semibold mb-4">Sessions</h3>
                <div className="space-y-6">
                    {campaignResult.sessions.map((session: CampaignSession) => (
                        <div
                            key={session.id}
                            className="border-l-4 border-blue-500 pl-4"
                        >
                            <h4 className="text-xl font-bold">
                                Session {session.number}: {session.title}
                            </h4>
                            <p className="text-gray-700 mb-1">
                                {session.summary}
                            </p>
                            <div className="text-sm text-gray-700 mb-2">
                                <strong>Events:</strong>
                                <ul className="list-disc list-inside ml-4 mt-1">
                                    {session.events.map((event, index) => (
                                        <li key={index}>{event}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-sm text-gray-700">
                                <strong>NPCs:</strong>
                                <ul className="list-disc list-inside ml-4 mt-1">
                                    {session.npcs.map((npcId) => {
                                        const npc = campaignResult.npcs.find(
                                            (n) => n.id === npcId
                                        );
                                        return (
                                            <li key={npcId}>
                                                {npc ? (
                                                    npc.name
                                                ) : (
                                                    <em className="text-red-500">
                                                        Unknown NPC ({npcId})
                                                    </em>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl font-semibold mb-4">NPCs</h3>
                <ul className="space-y-4">
                    {campaignResult.npcs.map((npc: CampaignNPC) => (
                        <li key={npc.id} className="border p-3 rounded">
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">
                                    {npc.name} ({npc.role})
                                </p>
                                <button
                                    onClick={() => setEditingNpc(npc)}
                                    className="px-4 py-1 bg-purple-600 text-white rounded"
                                >
                                    Edit
                                </button>
                            </div>
                            <p className="text-sm text-gray-600">
                                <strong>Appears in Session</strong>{" "}
                                {npc.firstAppearsIn}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Status: </strong>
                                {npc.alive ? (
                                    <span className="text-green-600 font-bold">
                                        Alive
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-bold">
                                        Dead
                                    </span>
                                )}
                            </p>
                            {npc.notes && (
                                <p className="text-sm text-gray-700 mt-1">
                                    <strong>Notes:</strong> {npc.notes}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {editingNpc && (
                <NpcEditModal
                    npc={editingNpc}
                    onClose={() => setEditingNpc(null)}
                />
            )}
        </div>
    );
};

export default CampaignViewer;
