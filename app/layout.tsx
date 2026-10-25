import type { Metadata } from "next";
import "./globals.css";
import GlobalChrome from "@/components/layout/GlobalChrome";

export const metadata: Metadata = {
  title: "Hawkins Local Experience",
  description: "Stranger Things immersive fan site",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="film-grain" aria-hidden />
        <GlobalChrome />
        {children}
      </body>
    </html>
  );
}
