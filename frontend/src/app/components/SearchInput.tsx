import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DETAIL_LEVELS } from "../constants/detailLevels";
import { useState } from "react";

interface SearchInputProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  setArticle: Dispatch<SetStateAction<string>>;
}

export const SearchInput = ({
  input,
  setInput,
  setArticle,
}: SearchInputProps) => {
  const [detailLevel, setDetailLevel] = useState(DETAIL_LEVELS.BRIEF);
  const generateArticle = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input,
        brief: detailLevel === DETAIL_LEVELS.BRIEF,
      }),
    });
    const data = await res.json();
    setArticle(data.article);
  };

  const handleDetailLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetailLevel(e.target.value);
  };
  return (
    <div className="flex flex-col justify-start">
      <input
        className="bg-pastel-white p-4 rounded-lg focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Disease name"
        required
      />
      <div className="flex gap-8">
        <label className="flex flex-row gap-2">
          <input
            className="flex"
            type="radio"
            id={DETAIL_LEVELS.BRIEF}
            name="detailLevel"
            value={DETAIL_LEVELS.BRIEF}
            checked={detailLevel === DETAIL_LEVELS.BRIEF}
            onChange={handleDetailLevelChange}
          />
          <p className="flex">Brief</p>
        </label>
        <label className="flex flex-row gap-2">
          <input
            className="flex"
            type="radio"
            id={DETAIL_LEVELS.DETAILED}
            name="detailLevel"
            value={DETAIL_LEVELS.DETAILED}
            checked={detailLevel === DETAIL_LEVELS.DETAILED}
            onChange={handleDetailLevelChange}
          />
          <p className="flex">Detailed</p>
        </label>
      </div>
      <button
        className="bg-pastel-primary text-pastel-text px-6 py-2 rounded-xl hover:bg-pastel-secondary w-sm"
        onClick={generateArticle}
      >
        Generate Article
      </button>
    </div>
  );
};
