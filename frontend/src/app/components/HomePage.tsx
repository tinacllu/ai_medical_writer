"use client";
import { MainContainer } from "./MainContainer";
import { SidebarContainer } from "./Sidebar/SidebarContainer";

interface HomePageProps {
  children: React.ReactNode;
}
export const HomePage = ({ children }: HomePageProps) => {
  return (
    <div className="bg-primary-light text-brown-dark p-0 flex flex-row">
      <SidebarContainer />
      <main>{children}</main>
    </div>
  );
};
