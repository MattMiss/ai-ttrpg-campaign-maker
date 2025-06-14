import type { CampaignResult } from "../types/Campaign";

export const formatCampaignToText = (campaign: CampaignResult): string => {
    const { title, summary, sessions, npcs } = campaign;

    const sessionText = sessions
        .sort((a, b) => a.number - b.number)
        .map((summary) =>
            `
Session ${summary.number}: ${summary.title}
Summary: ${summary.summary}
Events:
${summary.events.map((event) => `- ${event}`).join("\n")}
NPCs Involved: ${summary.npcs.join(", ")}
`.trim()
        )
        .join("\n\n");

    const npcText = npcs
        .map((npc) =>
            `
${npc.name} (${npc.role})
Status: ${npc.alive ? "Alive" : "Deceased"}
First Appears In: Session ${npc.firstAppearsIn}
${npc.notes ? `Notes: ${npc.notes}` : ""}
`.trim()
        )
        .join("\n\n");

    return `
Title: ${title}
  
Summary:
${summary}
  
========================
Sessions
========================

${sessionText}

========================
NPCs
========================

${npcText}
`.trim();
};

export const downloadTextFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
};
