// components/CampaignViewer.tsx
import { useCampaign } from "../context/CampaignContext";
import type { CampaignSession, CampaignNPC } from "../types/Campaign";

const CampaignViewer = () => {
  const { campaignResult } = useCampaign();

  if (!campaignResult) return null;

  return (
    <div className="space-y-8 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-3xl font-bold mb-2">{campaignResult.title}</h2>
        <p className="text-gray-700">{campaignResult.summary}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">Sessions</h3>
        <div className="space-y-6">
          {campaignResult.sessions.map((session: CampaignSession) => (
            <div key={session.id} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-xl font-bold">
                Session {session.number}: {session.title}
              </h4>
              <p className="text-gray-700 mb-1">{session.summary}</p>
              <p className="text-sm text-gray-500">
                <strong>Events:</strong> {session.events.join(", ")}
              </p>
              <p className="text-sm text-gray-500">
                <strong>NPCs:</strong> {session.npcs.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">NPCs</h3>
        <ul className="space-y-4">
          {campaignResult.npcs.map((npc: CampaignNPC) => (
            <li key={npc.id} className="border p-3 rounded">
              <p className="text-lg font-bold">
                {npc.name} ({npc.role})
              </p>
              <p className="text-sm text-gray-600">
                Appears in Session {npc.firstAppearsIn}
              </p>
              <p className="text-sm text-gray-600">Status: {npc.alive ? "Alive" : "Deceased"}</p>
              {npc.notes && (
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Notes:</strong> {npc.notes}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampaignViewer;
