import { ChangeEvent, useState } from "react";
import { DETAIL_LEVELS } from "../constants/detailLevels";
import { ArticleContent } from "./ArticleContent";
import { SearchInput } from "./SearchInput";

export const MainContainer = () => {
  const [input, setInput] = useState("");
  const [article, setArticle] = useState("");

  return (
    <div>
      <SearchInput input={input} setInput={setInput} setArticle={setArticle} />
      <div>
        {article && <ArticleContent disease={input} article={article} />}
      </div>
    </div>
  );
};
