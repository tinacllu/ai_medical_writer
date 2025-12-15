"use client";

import { use } from "react";
import { ArticleContent } from "../../components/ArticleContent";
import { useSWRConfig } from "swr/_internal";

interface GeneratedArticleProps {
  params: Promise<{ disease: string }>;
}
export default function GeneratedArticle({ params }: GeneratedArticleProps) {
  const { cache } = useSWRConfig();

  const { disease } = use(params);
  const decodedDisease = decodeURIComponent(disease);

  return (
    <div className="flex flex-col grow p-8">
      <div className="bg-primary-med px-8 pt-8 w-140 rounded-t-xl ">
        <h1 className="text-brown-dark">{decodedDisease} 🪶</h1>
      </div>
      <div className="bg-primary-med rounded-xl rounded-tl-none p-8">
        <ArticleContent
          disease={decodedDisease.replace(/-(detailed|brief)$/, "")}
          article={cache.get(decodedDisease)?.data.article ?? ""}
          isLoading={false}
        />
      </div>
    </div>
  );
}
