import "./globals.css";
import React from "react";

export const metadata = {
  title: "GeoQuest",
  description: "Игра с география",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
