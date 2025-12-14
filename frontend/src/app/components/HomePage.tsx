"use client";
import Link from "next/link";
import { SidebarContainer } from "./Sidebar/SidebarContainer";
import { HomeIcon } from "@heroicons/react/24/solid";
import { SearchHistoryProvider } from "../contexts/SearchHistoryContext";

interface HomePageProps {
  children: React.ReactNode;
}
export const HomePage = ({ children }: HomePageProps) => {
  return (
    <SearchHistoryProvider>
      <div className="bg-primary-light text-brown-dark p-0 flex flex-row relative">
        <SidebarContainer />
        <main className="w-dvw">{children}</main>
        <Link href="/" className="fixed top-0 right-0 py-6 px-4">
          <HomeIcon width={32} height={32} />
        </Link>
      </div>
    </SearchHistoryProvider>
  );
};
