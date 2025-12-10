import { ChangeEvent, useState } from "react";
import { detailLevels } from "../constants/detailLevels";

export const SearchContainer = () => {
  const [input, setInput] = useState("");
  const [article, setArticle] = useState("");
  const [detailLevel, setDetailLevel] = useState(detailLevels.BRIEF);

  const generateArticle = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input,
        brief: detailLevel === detailLevels.BRIEF,
      }),
    });
    const data = await res.json();
    console.log(data);
    setArticle(data.article);
  };

  const handleDetailLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetailLevel(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter topic..."
        />
        <label>
          Brief
          <input
            type="radio"
            id={detailLevels.BRIEF}
            name="detailLevel"
            value={detailLevels.BRIEF}
            checked={detailLevel === detailLevels.BRIEF}
            onChange={handleDetailLevelChange}
          />
        </label>
        <label>
          Detailed
          <input
            type="radio"
            id={detailLevels.DETAILED}
            name="detailLevel"
            value={detailLevels.DETAILED}
            checked={detailLevel === detailLevels.DETAILED}
            onChange={handleDetailLevelChange}
          />
        </label>
        <button onClick={generateArticle}>Generate Article</button>
        {article && <div>{article}</div>}
      </div>
    </div>
  );
};
