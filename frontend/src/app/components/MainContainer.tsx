import { useState } from "react";
import { ArticleContent } from "./ArticleContent";
import { SearchInput } from "./SearchInput";

export const MainContainer = () => {
  const [input, setInput] = useState("");
  const [article, setArticle] = useState(
    "Search a disease name to get started"
  );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col grow p-8">
      <div className="bg-primary-med px-8 pt-8 w-140 rounded-t-xl ">
        <h1 className="text-brown-dark">Medical Writer Assistant 🪶</h1>
      </div>
      <div className="bg-primary-med rounded-xl rounded-tl-none p-8">
        <SearchInput
          input={input}
          setInput={setInput}
          setArticle={setArticle}
          setIsLoading={setIsLoading}
        />
        <div>
          {article && (
            <ArticleContent
              disease={input}
              article={article}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
