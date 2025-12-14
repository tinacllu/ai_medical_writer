import ReactMarkdown from "react-markdown";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface ArticleContentProps {
  disease: string;
  article: string;
  isLoading: boolean;
}

export const ArticleContent = ({
  disease,
  article,
  isLoading,
}: ArticleContentProps) => {
  const downloadWordDoc = async () => {
    const res = await fetch("/api/download/word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disease, article }),
    });

    if (!res.ok) {
      alert("Failed to download Word document");
      return;
    }

    console.log("disease", disease);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${disease}.docx`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const downloadPdf = async () => {
    const res = await fetch("/api/download/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disease, article }),
    });

    if (!res.ok) {
      alert("Failed to download PDF");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${disease}.pdf`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-cream-light p-8 mx-0 rounded-lg shadow-md flex flex-col gap-8">
      <div className="flex flex-row gap-8 justify-end text-primary-dark">
        <button
          className="flex gap-2 hover:font-bold cursor-pointer"
          onClick={downloadWordDoc}
        >
          <ArrowDownTrayIcon width={20} height={20} />
          <p>Word</p>
        </button>
        <button
          className="flex gap-2 hover:font-bold cursor-pointer"
          onClick={downloadPdf}
        >
          <ArrowDownTrayIcon width={20} height={20} />
          <p>PDF</p>
        </button>
      </div>
      {isLoading ? (
        <h2>Generating Disease Overview...</h2>
      ) : (
        <div>
          {article ? (
            <h2 className="text-2xl font-bold pb-8">{disease}</h2>
          ) : (
            <h2>Search a disease to learn more.</h2>
          )}
          <ReactMarkdown>{article}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
