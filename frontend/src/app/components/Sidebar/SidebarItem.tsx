import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchHistoryContext } from "../../contexts/SearchHistoryContext";

interface SidebarItemProps {
  isCollapsed: boolean;
  disease: string;
}

export const SidebarItem = ({ isCollapsed, disease }: SidebarItemProps) => {
  const { history, setHistory } = useSearchHistoryContext();
  console.log("disease", disease);

  return (
    <div className="flex flex-row gap-2">
      <Link
        href={`/article/${disease}`}
        className="bg-orange-med flex justify-center align-center py-2 px-4 rounded-xl hover:bg-orange-dark"
      >
        <button className="cursor-pointer w-45" title={disease}>
          {isCollapsed ? disease[0].toLocaleUpperCase() : disease}
        </button>
      </Link>
      <button
        onClick={() => setHistory(history.filter((item) => item != disease))}
        className="text-primary-light cursor-pointer "
      >
        <XMarkIcon width={24} height={24} />
      </button>
    </div>
  );
};
