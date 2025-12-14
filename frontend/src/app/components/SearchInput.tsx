import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DETAIL_LEVELS } from "../constants/detailLevels";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { GenerateArticleBody } from "../api/generate/route";
import { mutate } from "swr";
import { useSearchHistoryContext } from "../contexts/SearchHistoryContext";

interface SearchInputProps {
  disease: string;
  setDisease: Dispatch<SetStateAction<string>>;
  setArticle: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const SearchInput = ({
  disease,
  setDisease,
  setArticle,
  setIsLoading,
}: SearchInputProps) => {
  const [detailLevel, setDetailLevel] = useState(DETAIL_LEVELS.BRIEF);
  const [input, setInput] = useState("");
  const { history, setHistory } = useSearchHistoryContext();

  const { trigger: generateArticle, isMutating } = useSWRMutation<
    { article: string },
    { message: string },
    string,
    GenerateArticleBody
  >("/api/generate", async (url, { arg }) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
    });

    if (!res.ok) {
      throw new Error("Failed to generate article");
    }

    return res.json();
  });

  const handleGenerate = async () => {
    setArticle("");
    setIsLoading(true);
    if (input) {
      const formattedInput = input.trim().toLocaleLowerCase();
      setDisease(input);
      try {
        const data = await generateArticle({
          input: formattedInput,
          brief: detailLevel === DETAIL_LEVELS.BRIEF,
        });
        mutate(`${formattedInput}-${detailLevel}`, data);
        setHistory([...history, `${formattedInput}-${detailLevel}`]);
        setArticle(data.article);
        setInput("");
        setIsLoading(false);
      } catch (err) {
        console.error("Error generating article:", err);
      }
    }
  };

  const handleDetailLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetailLevel(e.target.value);
  };

  return (
    <form className="flex flex-col justify-start gap-2">
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
          disabled={input === "" || isMutating}
        >
          {isMutating ? "Generating..." : "Generate Article"}
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
    </form>
  );
};
