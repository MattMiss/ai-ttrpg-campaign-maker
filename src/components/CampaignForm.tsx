// components/CampaignForm.tsx
import { useState } from "react";
import type { CampaignInput } from "../types/Campaign";

const GENRE_OPTIONS = [
    "Apocalyptic",
    "Comedy",
    "Cyberpunk",
    "Dark Fantasy",
    "Dieselpunk",
    "Espionage",
    "Fantasy",
    "Gothic Horror",
    "Historical",
    "Horror",
    "Lovecraftian",
    "Martial Arts",
    "Mecha",
    "Modern Day",
    "Mystery",
    "Noir",
    "Post-Apocalyptic",
    "Psychological Thriller",
    "Romance",
    "Sci-Fi",
    "Space Opera",
    "Steampunk",
    "Superhero",
    "Survival",
    "Swashbuckling",
    "Urban Fantasy",
    "Western",
    "Other"
];

type Errors = {
    genre?: string;
    beats?: string;
}

interface Props {
    onSubmit: (data: CampaignInput) => void;
}

const CampaignForm = ({ onSubmit }: Props) => {
    const [genre, setGenre] = useState("");
    const [customGenre, setCustomGenre] = useState("");   
    const [length, setLength] = useState<number>(1);
    const [beats, setBeats] = useState<string[]>([""]);
    const [errors, setErrors] = useState<Errors>({});

    const finalGenre = genre === "Other" ? customGenre.trim() : genre;

    const handleChangeBeat = (index: number, value: string) => {
        const updated = [...beats];
        updated[index] = value;
        setBeats(updated);
    };

    const addBeat = () => setBeats([...beats, ""]);
    const removeBeat = (index: number) =>
        setBeats(beats.filter((_, i) => i !== index));

    const validate = (): Errors => {
        const currentErrors : Errors = {};

        if (finalGenre === "") {
            currentErrors.genre = "Must enter a genre";
        }
        if (beats.length === 1 && beats[0] === "") {
            currentErrors.beats = "Must have at least 1 story beat";
        }
        return currentErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validation = validate();
        if (Object.keys(validation).length > 0){
            setErrors(validation);
        }else{
            onSubmit({
                genre: finalGenre,
                length,
                beats: beats.filter((b) => b.trim()),
            });
        }       
    };

    console.log(beats.length)

    return (
        <form
            className="bg-white rounded space-y-4 p-4"
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl font-bold">Create New Campaign</h2>

            <label className="block">
                Genre:
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                    required
                >
                    <option value="">-- Select a Genre --</option>
                    {GENRE_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </label>

            {genre === "Other" && (
                <label className="mt-2">
                    Custom Genre:
                    <input
                        type="text"
                        value={customGenre}
                        onChange={(e) => setCustomGenre(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        placeholder="Enter your genre"
                    />
                </label>
            )}

            {errors.genre && (
                <div className="mt-1 text-red-500 font-bold">
                    {errors.genre}
                </div>
            )}

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
                            onChange={(e) =>
                                handleChangeBeat(i, e.target.value)
                            }
                            className="flex-grow border p-2 rounded"
                            placeholder={`Beat ${i + 1}`}
                        />
                        {beats.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeBeat(i)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                {errors.beats && (
                    <div className="mt-1 text-red-500 font-bold">
                        {errors.beats}
                    </div>
                )}
                <button
                    type="button"
                    onClick={addBeat}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add New Beat
                </button>
            </div>

            <button
                type="submit"
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
            >
                Generate Campaign
            </button>
        </form>
    );
};

export default CampaignForm;
