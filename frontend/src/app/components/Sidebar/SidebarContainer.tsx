import { Sidebar } from "./Sidebar";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { ChevronDoubleLeftIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export const SidebarContainer = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-brown-dark ${
          isCollapsed ? "py-8 px-4" : "p-8"
        } outline-20`}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </div>
      <button
        className="rounded-3xl p-2 text-cream-light h-10 my-7 bg-orange-med"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronDoubleRightIcon width={24} height={24} />
        ) : (
          <ChevronDoubleLeftIcon width={24} height={24} />
        )}
      </button>
    </div>
  );
};
