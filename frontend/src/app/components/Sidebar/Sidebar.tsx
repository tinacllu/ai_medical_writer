import { SidebarItem } from "./SidebarItem";
import { ClockIcon } from "@heroicons/react/24/outline";

interface SidebarItemProps {
  isCollapsed: boolean;
}

export const Sidebar = ({ isCollapsed }: SidebarItemProps) => {
  const placeholders = [
    {
      disease: "asthma",
      article:
        "Asthma - Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
    },
    {
      disease: "anemia",
      article:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
    },
  ];
  return (
    <div>
      <div className="text-primary-light flex flex-row gap-4">
        <ClockIcon width={32} height={32} />
        {!isCollapsed && (
          <h2 className="text-primary-light text-2xl">History</h2>
        )}
      </div>
      <div className="flex flex-col gap-4 py-4">
        {placeholders.map((item, index) => (
          <SidebarItem
            key={item.disease + index}
            isCollapsed={isCollapsed}
            disease={item.disease}
            article={item.article}
          />
        ))}
      </div>
    </div>
  );
};
