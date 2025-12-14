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
      <div className="bg-primary-light text-brown-dark p-0 flex flex-row">
        <SidebarContainer />
        <main className="w-dvw">{children}</main>
        <Link href="/" className="px-4 py-6">
          <HomeIcon width={32} height={32} />
        </Link>
      </div>
    </SearchHistoryProvider>
  );
};
