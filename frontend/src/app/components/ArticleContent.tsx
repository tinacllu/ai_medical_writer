import ReactMarkdown from "react-markdown";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface ArticleContentProps {
  disease: string;
  article: string;
}

export const ArticleContent = ({ disease, article }: ArticleContentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const downloadWordDoc = async () => {
    const res = await fetch("api/download/word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disease, article }),
    });

    console.log(res);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${disease}.docx`;
    a.click();
  };

  return (
    <div className="bg-cream-light p-8 mx-0 rounded-lg shadow-md flex flex-col gap-8">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex flex-row w-55 relative self-end button"
      >
        <p className="flex w-7/8">Download Article</p>
        <ChevronDownIcon width={24} height={24} className="flex" />
      </button>
      {isMenuOpen && (
        <div className="fixed self-end mt-10">
          <div className="flex flex-col bg-orange-light w-55">
            <button
              className="flex w-55 text-primary-dark bg-transparent"
              onClick={downloadWordDoc}
            >
              Download as Word
            </button>
            <button className="flex w-55 text-primary-dark bg-transparent">
              Download as PDF
            </button>
          </div>
        </div>
      )}
      <ReactMarkdown>{article}</ReactMarkdown>
    </div>
  );
};
