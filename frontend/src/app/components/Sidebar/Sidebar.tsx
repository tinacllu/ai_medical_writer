import { SidebarItem } from "./SidebarItem";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchHistoryContext } from "../../contexts/SearchHistoryContext";

interface SidebarProps {
  isCollapsed: boolean;
}

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const { history, setHistory } = useSearchHistoryContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-primary-light flex flex-row gap-4">
        <ClockIcon width={32} height={32} />
        {!isCollapsed && (
          <h2 className="text-primary-light text-2xl">History</h2>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {(history ?? []).map((disease, index) => (
          <SidebarItem
            key={disease + index}
            isCollapsed={isCollapsed}
            disease={disease}
          />
        ))}
      </div>
      {history.length > 1 && (
        <button
          className="flex text-primary-med cursor-pointer"
          onClick={() => setHistory([])}
        >
          <p className="text-primary-med">Clear All</p>
          <XMarkIcon width={24} height={24} />
        </button>
      )}
    </div>
  );
};
