import type { CampaignResult } from "../types/Campaign";

/**
 * Converts a CampaignResult object into a readable text format for download.
 * Includes the campaign title, summary, session breakdown, and NPC list.
 *
 * @param campaign - The full campaign object to be formatted
 * @returns A string representing the campaign in plain text format
 */
export const formatCampaignToText = (campaign: CampaignResult): string => {
    const { title, summary, sessions, npcs } = campaign;

    // Helper to convert an NPC ID to its full name
    const getNpcNameById = (id: string) => {
        const npc = npcs.find((n) => n.id === id);
        return npc ? npc.name : id;
    };

    // Format each session with title, summary, events, and named NPCs
    const sessionText = sessions
        .sort((a, b) => a.number - b.number)
        .map((session) =>
            `
Session ${session.number}: ${session.title}
Summary: ${session.summary}
Events:
${session.events.map((event) => `- ${event}`).join("\n")}
NPCs Involved: ${session.npcs.map(getNpcNameById).join(", ")}
`.trim()
        )
        .join("\n\n");

    // Format each NPC entry
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

    // Final formatted text output
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

/**
 * Triggers a text file download of the formatted campaign data.
 *
 * @param campaign - The full campaign object to export
 * @param filename - The name to use for the downloaded file
 */
export const downloadTextFile = (campaign: CampaignResult, filename: string) => {
    if (!filename) return; // User cancelled

    const content = formatCampaignToText(campaign);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create and trigger download link
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
    link.click();

    // Clean up object URL
    URL.revokeObjectURL(url);
};