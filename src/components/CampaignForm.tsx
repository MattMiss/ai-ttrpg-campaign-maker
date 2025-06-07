// components/CampaignForm.tsx
import { useState } from "react";
import type { CampaignInput, CampaignSize } from "../types/Campaign";

interface Props {
  onSubmit: (data: CampaignInput) => void;
}

const CampaignForm = ({ onSubmit }: Props) => {
  const [genre, setGenre] = useState("");
  const [size, setSize] = useState<CampaignSize>("medium");
  const [beats, setBeats] = useState<string[]>([""]);
  
  const handleChangeBeat = (index: number, value: string) => {
    const updated = [...beats];
    updated[index] = value;
    setBeats(updated);
  };

  const addBeat = () => setBeats([...beats, ""]);
  const removeBeat = (index: number) =>
    setBeats(beats.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ genre, size, beats: beats.filter(b => b.trim()) });
  };

  return (
    <form className="space-y-4 p-4 max-w-xl" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">Create New Campaign</h2>

      <label className="block">
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </label>

      <label className="block">
        Size:
        <select
          value={size}
          onChange={(e) => setSize(e.target.value as "short" | "medium" | "long")}
          className="w-full border p-2 rounded"
        >
          <option value="short">Short (3–4 sessions)</option>
          <option value="medium">Medium (5–8 sessions)</option>
          <option value="long">Long (10+ sessions)</option>
        </select>
      </label>

      <div>
        <label>Story Beats:</label>
        {beats.map((beat, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              type="text"
              value={beat}
              onChange={(e) => handleChangeBeat(i, e.target.value)}
              className="flex-grow border p-2 rounded"
              placeholder={`Beat ${i + 1}`}
            />
            <button type="button" onClick={() => removeBeat(i)} className="text-red-500">✕</button>
          </div>
        ))}
        <button type="button" onClick={addBeat} className="mt-2 text-blue-500">+ Add Beat</button>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Generate Campaign
      </button>
    </form>
  );
};

export default CampaignForm;
