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
    <div className="flex flex-col justify-start gap-2">
      <div className="flex flex-row justify-between gap-2">
        <input
          className="bg-cream-light p-4 rounded-lg focus:outline-green-med grow h-12"
          id="search"
          name="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Disease name"
          required
        />

        <button
          className="button border-green-light border-1"
          onClick={generateArticle}
          disabled={input === ""}
        >
          Generate Article
        </button>
      </div>
      <div className="flex gap-8 pb-8">
        <label className="flex flex-row gap-2">
          <input
            type="radio"
            id={DETAIL_LEVELS.BRIEF}
            name="detailLevel"
            value={DETAIL_LEVELS.BRIEF}
            checked={detailLevel === DETAIL_LEVELS.BRIEF}
            onChange={handleDetailLevelChange}
          />
          <p className="text-brown-dark">Brief</p>
        </label>
        <label className="flex flex-row gap-2">
          <input
            type="radio"
            id={DETAIL_LEVELS.DETAILED}
            name="detailLevel"
            value={DETAIL_LEVELS.DETAILED}
            checked={detailLevel === DETAIL_LEVELS.DETAILED}
            onChange={handleDetailLevelChange}
          />
          <p className="text-brown-dark">Detailed</p>
        </label>
      </div>
    </div>
  );
};
