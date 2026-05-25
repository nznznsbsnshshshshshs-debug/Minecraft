import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YGP Minecraft",
  description: "Minecraft creator ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
