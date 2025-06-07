// components/CampaignForm.tsx
import { useState } from "react";
import type { CampaignInput } from "../types/Campaign";

interface Props {
  onSubmit: (data: CampaignInput) => void;
}

const CampaignForm = ({ onSubmit }: Props) => {
  const [genre, setGenre] = useState("");
  const [length, setLength] = useState<number>(1);
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
    onSubmit({ genre, length, beats: beats.filter(b => b.trim()) });
  };

  return (
    <form className="bg-white rounded-xl space-y-4 p-4 max-w-xl" onSubmit={handleSubmit}>
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
        Campaign Length (number of sessions):
        <input
          type="number"
          value={length}
          min={1}
          max={100}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
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
