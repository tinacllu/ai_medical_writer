import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DETAIL_LEVELS } from "../constants/detailLevels";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { GenerateArticleBody } from "../api/generate/route";
import { mutate } from "swr";
import { useSearchHistoryContext } from "../contexts/SearchHistoryContext";

interface SearchInputProps {
  setDisease: Dispatch<SetStateAction<string>>;
  setArticle: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const SearchInput = ({
  setDisease,
  setArticle,
  setIsLoading,
}: SearchInputProps) => {
  const [formData, setFormData] = useState({
    input: "",
    detailLevel: DETAIL_LEVELS.BRIEF,
  });

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

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticle("");
    setIsLoading(true);
    if (formData.input) {
      const formattedInput = formData.input.trim().toLocaleLowerCase();
      setDisease(formData.input);
      try {
        const data = await generateArticle({
          input: formattedInput,
          brief: formData.detailLevel === DETAIL_LEVELS.BRIEF,
        });
        mutate(`${formattedInput}-${formData.detailLevel}`, data);
        setHistory([...history, `${formattedInput}-${formData.detailLevel}`]);
        setArticle(data.article);
        setFormData({ input: "", detailLevel: DETAIL_LEVELS.BRIEF });
        setIsLoading(false);
      } catch (err) {
        console.error("Error generating article:", err);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleGenerate}
      className="flex flex-col justify-start gap-2"
    >
      <div className="flex flex-row justify-between gap-2">
        <input
          className="bg-cream-light p-4 rounded-lg focus:outline-green-med grow h-12"
          id="input"
          name="input"
          value={formData.input}
          onChange={handleChange}
          placeholder="Disease name"
          required
        />
        <button className="button border-green-light border-1" type="submit">
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
            checked={formData.detailLevel === DETAIL_LEVELS.BRIEF}
            onChange={handleChange}
          />
          <p className="text-brown-dark">Brief</p>
        </label>
        <label className="flex flex-row gap-2">
          <input
            type="radio"
            id={DETAIL_LEVELS.DETAILED}
            name="detailLevel"
            value={DETAIL_LEVELS.DETAILED}
            checked={formData.detailLevel === DETAIL_LEVELS.DETAILED}
            onChange={handleChange}
          />
          <p className="text-brown-dark">Detailed</p>
        </label>
      </div>
    </form>
  );
};
