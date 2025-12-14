import type { Metadata } from "next";
import "./globals.css";
import { HomePage } from "./components/HomePage";

export const metadata: Metadata = {
  title: "AI Medical Writer",
  description:
    "AI powered document generator for assistance in medical writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <HomePage>{children}</HomePage>
      </body>
    </html>
  );
}
