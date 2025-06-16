# 🎲 TTRPG Campaign Creator

An AI-powered tool to create, edit, and manage structured TTRPG (Tabletop Role-Playing Game) campaigns using GROQ's LLM (LLaMA 3). Generate sessions, summaries, and NPCs with intelligent prompts — and maintain a dynamic story world with consistency.

<br>

---

## Features

- Generate full campaigns from story beats and genre
- Add, edit, or remove sessions and NPCs with natural language
- Automatically update session summaries and NPCs when needed
- Includes support for BBEGs (Big Bad Evil Guys/Gals)
- Local storage saves progress between sessions
- Download campaigns as a text file
- Clean React UI with modals for edits

<br>

---

## Tech Stack

- **React + Vite** (Frontend)
- **Tailwind CSS** (Styling)
- **GROQ SDK** (AI interaction using LLaMA 3)
- **TypeScript** (Type safety)
- **Context API** (State management)

<br>

---

## AI Prompts & GROQ

- All prompts used in the project are located in the folder ```src/api/prompts/```
- All GROQ API function calls are located in ```src/api/groq/```

---

<br>

## Setup Instructions


### 1. Clone the Repository

```
git clone https://github.com/your-username/ttrpg-campaign-creator.git
cd ttrpg-campaign-creator
npm install
```

### 2. Add Groq API key
- Sign up for a free API key at https://console.groq.com/home
- Create an API key with groq
- Rename the file ```.env.example``` to ```.env```
- Replace ```your_groq_api_key``` with your new Groq API key


### 3. Run the App

```npm run dev``` will start the app

<br>
<br>

---

## Usage Guide

### 1. Create a New Campaign

Click **Create Campaign** in the top navigation bar to begin generating a brand new story.

**Steps:**
1. Enter the **Genre** of the campaign (e.g., “dark fantasy”, “cyberpunk”).
2. Set the desired **Length** in sessions (e.g., 6).
3. Add several high-level **Story Beats** (plot points the campaign should follow).

Example:
```
- The heroes wake up with no memory
- A mysterious power threatens the capital
- An ancient evil begins to stir again
```

4. Click **Generate Campaign**. The AI will respond with:
   - A campaign `summary`
   - A full list of `sessions` with events, summaries, and involved NPCs
   - A complete list of `NPCs`, including one BBEG

![Create Campaign Image](https://i.imgur.com/D181qdV.png)

---

### 2. View the Campaign

Click **My Campaigns** to explore your saved campaigns (stored in localStorage).

**What you’ll see:**
- A collapsible list of sessions
- Each session shows its number, title, summary, and involved NPCs
- A separate section listing all created NPCs

![View Created Campaign Image](https://i.imgur.com/M0OrBEw.png)

---

### 3. Editing the Campaign

You can edit any part of the campaign using natural-language instructions. The AI will automatically update references and summaries.

#### Edit a Session

- Click “Edit” on a session.
- Enter your instruction (e.g., *“Make the villain appear earlier”*).
- The AI updates the session's content and affected NPCs or the overall summary.

**Prompt type used:** `generateSessionEditPrompt`

![Edit a Session Image](https://i.imgur.com/8lZ3b6a.png)


#### ➕ Add a New Session

- Choose where to insert it (before or after a selected session).
- Provide an instruction like:
  - *“Add a prison break scene”*
  - *“Introduce a rival adventuring party”*

**Prompt type used:** `generateAddSessionPrompt`

![Add a New Session Image](https://i.imgur.com/ETPEGc4.png)


#### 🧍Edit an NPC

- Click “Edit” next to an NPC.
- Instructions may include:
  - *“Change their name to Zara”*
  - *“Make this NPC the BBEG”*
  - *“Mark them as dead”*


**Prompt type used:** `generateNpcEditPrompt`

![Edit an NPC Image](https://i.imgur.com/FTzdx9p.png)


#### Add a New NPC

- Use the Add NPC modal to enter an instruction like:
  - *“Add a grumpy dwarf blacksmith who helps the players”*

**Prompt type used:** `generateAddNpcPrompt`

![Add an NPC Image](https://i.imgur.com/W2MajTN.png)

#### Deleting Sessions or NPCs

- In edit mode, use instructions like:
  - *“Remove this NPC from the story”*
  - *“Delete this session”*
- The AI updates continuity, references, and session numbers.


#### Download Campaigns as Text Files

- In view campaign mode, click "Download Campaign" to:
  - Enter a filename for the download
  - Download the campaign as a text file

![Edit Download Filename Image](https://i.imgur.com/cgRYLOk.png)
![Downloaded Text File Image](https://i.imgur.com/hBiSwTD.png)

<br>

---

## Project Analysis - Capabilities, Limitations, and Future Improvements

### Capabilities

This app allows users to generate full TTRPG campaigns using AI with the following features:

- Generate structured multi-session campaigns based on user-provided genre and story beats
- Create detailed NPCs with roles, appearances, and relationships
- Add or edit sessions with contextual prompts
- Add or edit NPCs with campaign-wide consistency (Sessions update based on NPC updates)
- Maintain consistent story logic across all sessions and NPCs (Removing an NPC will update sessions they were involved in)
- View and modify campaigns with React and useContext
- Save and persist campaigns locally via localStorage
- Modular modal system for editing individual story elements

### Limitations and Workarounds

| Limitation | Description | Workaround |
|-----------|-------------|------------|
| AI JSON formatting | Sometimes the AI returns invalid JSON or includes unwanted text like \`\`\`json blocks | Added logic to strip markdown and fallback to try/catch around JSON.parse |
| Duplicate sessions or NPCs | When editing, the AI may reintroduce entities (e.g. 2x session 1) | Added logic to deduplicate sessions using ID-based Maps and merge intelligently |
| AI may return verbose or inconsistent responses | Instructions may be followed too literally or inconsistently | Refined prompts to be highly structured and added validation to enforce correct shape |
| Lack of context about deletions | AI edits sometimes remove entities without specifying what was deleted | Added prompt instructions to return deleted IDs (e.g. ```deletedNpcId```, ```deletedSessionIds```) |
| BBEG-specific logic | Needed special handling for the central villain | Added `isBBEG` checks in the prompts and the editor knows to emphasize that role |
| No server or DB support | Campaigns are stored only in localStorage | Clear messaging and IDs used for saving/reloading campaigns in browser |
| API key security | Exposing the Groq API key in the frontend | Restricted deployment to development use only, and omitted `.env` from commits |
| Session ordering bugs | Adding a session before/after another needs session number rebalancing | AI instructed to renumber subsequent sessions in add session prompts |
| Keeping campaign context with each prompt | Making calls with prompts to edit or add sessions/NPCs can lose previous campaign context | Campaign info pulled from local storage is sent along with each prompt in order to always have up to date campaign info
| Long campaign context size | Campaigns get large and could exceed prompt length limits | Used `JSON.stringify(campaign, null, 2)` but may need future truncation/summary strategy |

### Future Improvements

- Add server-side storage with user authentication to save and share campaigns
- Add optimized prompts so less tokens are used with each call
- Add rich text editor for editing summaries and events
- Add player character support with party dynamics
- Add search/filtering for large campaigns with many sessions/NPCs
- Add export to PDF or printable campaign summary
- Add testing or validation for generated JSON schema
- Add memory caching or summarization for long campaigns to keep context manageable

### Summary

This app showcases the power of AI-driven story generation and interactive editing within a structured campaign system. While there are technical and AI limitations, thoughtful prompt engineering and interface design help mitigate many of them. With more work, this could be turned into a very helpful campaign management tool for storytellers and game masters.