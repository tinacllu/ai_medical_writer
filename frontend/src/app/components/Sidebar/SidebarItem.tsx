import Link from "next/link";

interface SidebarItemProps {
  isCollapsed: boolean;
  disease: string;
}

export const SidebarItem = ({ isCollapsed, disease }: SidebarItemProps) => {
  return (
    <Link
      href={`/article/${disease}`}
      className="bg-orange-med flex justify-center align-center py-2 px-4 rounded-xl"
    >
      <button>{isCollapsed ? disease[0].toLocaleUpperCase() : disease}</button>
    </Link>
  );
};
