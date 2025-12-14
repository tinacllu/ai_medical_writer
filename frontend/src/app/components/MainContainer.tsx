import { useState } from "react";
import { ArticleContent } from "./ArticleContent";
import { SearchInput } from "./SearchInput";

export const MainContainer = () => {
  const [disease, setDisease] = useState("");
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col grow p-8">
      <div className="bg-primary-med px-8 pt-8 w-140 rounded-t-xl ">
        <h1 className="text-brown-dark">Medical Writer Assistant 🪶</h1>
      </div>
      <div className="bg-primary-med rounded-xl rounded-tl-none p-8">
        <SearchInput
          disease={disease}
          setDisease={setDisease}
          setArticle={setArticle}
          setIsLoading={setIsLoading}
        />
        <div>
          <ArticleContent
            disease={disease}
            article={article}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
