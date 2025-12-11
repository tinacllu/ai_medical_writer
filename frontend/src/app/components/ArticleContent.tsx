import ReactMarkdown from "react-markdown";

interface ArticleContentProps {
  article: string;
}

export const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <div className="bg-pastel-bg p-18 my-16 mx-0 rounded-lg shadow-md">
      <ReactMarkdown>{article}</ReactMarkdown>
    </div>
  );
};
