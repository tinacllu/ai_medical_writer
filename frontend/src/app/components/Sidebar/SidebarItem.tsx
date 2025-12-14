import Link from "next/link";

interface SidebarItemProps {
  isCollapsed: boolean;
  article: string;
  disease: string;
}

export const SidebarItem = ({
  isCollapsed,
  article,
  disease,
}: SidebarItemProps) => {
  return (
    <Link
      href={`/article/${disease}`}
      className="bg-orange-med flex justify-center align-center py-2 px-4 rounded-xl"
    >
      <button onClick={() => console.log("hi")}>
        {isCollapsed ? disease[0].toLocaleUpperCase() : disease}
      </button>
    </Link>
  );
};
