import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { MenuPopup } from "./MenuPopup";

export const SidebarItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>Item 1</p>
      <button onClick={() => setIsOpen(!isOpen)}>
        <EllipsisHorizontalIcon className="h-5 w-5 text-pastel-text" />
      </button>

      {isOpen && <MenuPopup />}
    </div>
  );
};
