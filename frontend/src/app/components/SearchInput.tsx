import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DETAIL_LEVELS } from "../constants/detailLevels";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

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

  const { trigger: generateArticle, isMutating } = useSWRMutation<
    { article: string },
    { message: string },
    string,
    { input: string; brief: boolean }
  >(
    "/api/generate",
    async (url, { arg }) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      });

      if (!res.ok) {
        throw new Error("Failed to generate article");
      }

      return res.json();
    },
    { populateCache: true }
  );

  const handleGenerate = async () => {
    if (!input) return;

    try {
      const data = await generateArticle({
        input,
        brief: detailLevel === DETAIL_LEVELS.BRIEF,
      });
      setInput("");
      setArticle(data.article);
    } catch (err) {
      console.error("Error generating article:", err);
    }
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
          onClick={handleGenerate}
          disabled={input === ""}
        >
          {isMutating ? "Generating" : "Generate Article"}
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
