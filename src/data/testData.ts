import type { CampaignResult } from "../types/Campaign";

export const testData : CampaignResult = {
  "title": "Voidbound",
  "summary": "The crew of the spaceship 'Aurora' embarks on a mission to investigate the disappearance of a research vessel, only to find the ship empty and adrift in space. As they delve deeper into the mystery, they uncover clues that suggest something sinister is at play.",
  "sessions": [
    {
      "id": "session-1",
      "number": 1,
      "title": "The Empty Ship",
      "summary": "The crew of the Aurora discovers the abandoned research vessel, 'Horizon's Edge', and begins to investigate its empty corridors. They soon realize that the ship's crew has vanished without a trace, leaving behind only cryptic clues and malfunctioning equipment.",
      "events": [
        "Discovery of the Horizon's Edge",
        "Initial investigation of the ship",
        "Discovery of cryptic logs and malfunctioning equipment"
      ],
      "npcs": ["Captain Lewis", "Chief Engineer Patel"]
    },
    {
      "id": "session-2",
      "number": 2,
      "title": "Unraveling the Mystery",
      "summary": "As the crew of the Aurora digs deeper into the mystery, they uncover evidence of a catastrophic event that may have led to the disappearance of the Horizon's Edge crew. They must navigate the ship's damaged systems and avoid potential hazards to uncover the truth.",
      "events": [
        "Discovery of a hidden laboratory",
        "Encounter with a malfunctioning AI",
        "Uncovering evidence of a catastrophic event"
      ],
      "npcs": ["Captain Lewis", "Chief Engineer Patel", "Dr. Samantha Taylor"]
    },
    {
      "id": "session-3",
      "number": 3,
      "title": "The Dark Truth",
      "summary": "The crew of the Aurora finally uncovers the dark truth behind the disappearance of the Horizon's Edge crew. They must confront the consequences of their discovery and make a choice that will determine the fate of their own mission and the future of humanity.",
      "events": [
        "Confrontation with the true culprit",
        "Revelation of the dark truth",
        "Final confrontation and resolution"
      ],
      "npcs": ["Captain Lewis", "Chief Engineer Patel", "Dr. Samantha Taylor", "The Architect"]
    }
  ],
  "npcs": [
    {
      "id": "npc-1",
      "name": "Captain Lewis",
      "role": "Captain of the Aurora",
      "alive": true,
      "firstAppearsIn": 1,
      "notes": "Seasoned captain with years of experience in deep space missions"
    },
    {
      "id": "npc-2",
      "name": "Chief Engineer Patel",
      "role": "Chief Engineer of the Aurora",
      "alive": true,
      "firstAppearsIn": 1,
      "notes": "Skilled engineer with expertise in spaceship systems and repair"
    },
    {
      "id": "npc-3",
      "name": "Dr. Samantha Taylor",
      "role": "Scientist",
      "alive": false,
      "firstAppearsIn": 2,
      "notes": "Leading researcher on the Horizon's Edge project, found dead on the ship"
    },
    {
      "id": "npc-4",
      "name": "The Architect",
      "role": "Mysterious entity",
      "alive": true,
      "firstAppearsIn": 3,
      "notes": "The true culprit behind the disappearance of the Horizon's Edge crew, with motives that threaten the entire galaxy"
    }
  ]
}