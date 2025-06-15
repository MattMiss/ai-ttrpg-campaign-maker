// components/CampaignViewer.tsx
import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import type { CampaignSession, CampaignNPC } from "../types/Campaign";
import NpcEditModal from "./modals/NpcEditModal";
import SessionEditModal from "./modals/SessionEditModal";
import { downloadTextFile } from "../utils/data.helper";
import DeleteCampaignModal from "./modals/DeleteCampaignModal";

const CampaignViewer = () => {
    const { campaignResult, deleteCampaign } = useCampaign();
	const [editingNpc, setEditingNpc] = useState<CampaignNPC | null>(null);
    const [editingSession, setEditingSession] = useState<CampaignSession | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    if (!campaignResult) return null;

    return (
        <div className="space-y-8 mt-6">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-3xl font-bold mb-2">
                    {campaignResult.title}
                </h2>
                <p className="text-gray-700">{campaignResult.summary}</p>
                <div className="mt-4 flex gap-4 md:gap-20">
                    <button
                        onClick={() => downloadTextFile(campaignResult)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Download Campaign
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Delete Campaign
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl font-semibold mb-4">Sessions</h3>
                <div className="space-y-6">
                    {campaignResult.sessions.map((session: CampaignSession) => (
                        <div
                            key={session.id}
                            className="border border-2 border-gray-400 p-3 rounded"
                        >
                            <div className="flex justify-between">
                                <h4 className="text-xl font-bold">
                                    Session {session.number}: {session.title}
                                </h4>
                                <button
                                    onClick={() => setEditingSession(session)}
                                    className="px-4 py-1 bg-purple-600 text-white rounded"
                                >
                                    Edit
                                </button>
                            </div>
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
                        <li
                            key={npc.id}
                            className="border border-2 border-gray-400 p-3 rounded"
                        >
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

            {editingSession && (
                <SessionEditModal
                    session={editingSession}
                    onClose={() => setEditingSession(null)}
                />
            )}

            {showDeleteModal && (
                <DeleteCampaignModal 
                    campaignTitle={campaignResult.title}
                    onDelete={deleteCampaign}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default CampaignViewer;
