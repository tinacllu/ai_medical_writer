import ReactMarkdown from "react-markdown";

interface ArticleContentProps {
  disease: string;
  article: string;
}

export const ArticleContent = ({ disease, article }: ArticleContentProps) => {
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
    <div className="bg-pastel-bg p-18 my-16 mx-0 rounded-lg shadow-md">
      <button className="btn" onClick={downloadWordDoc}>
        Download as Word
      </button>
      <button>Download as PDF</button>
      <ReactMarkdown>{article}</ReactMarkdown>
    </div>
  );
};
