"use client";

import { use } from "react";
import { ArticleContent } from "../../components/ArticleContent";

interface GeneratedArticleProps {
  params: Promise<{ id: string }>;
}
export default function GeneratedArticle({ params }: GeneratedArticleProps) {
  const placeholderText =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.";

  const { id } = use(params);
  return (
    <div className="flex flex-col grow p-8">
      <div className="bg-primary-med px-8 pt-8 w-140 rounded-t-xl ">
        <h1 className="text-brown-dark">{id} 🪶</h1>
      </div>
      <div className="bg-primary-med rounded-xl rounded-tl-none p-8">
        <ArticleContent disease={id} article={placeholderText} />
      </div>
    </div>
  );
}
