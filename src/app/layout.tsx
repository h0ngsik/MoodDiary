import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "감정 일기",
  description: "매일의 감정을 기록하고 추적하는 웹 애플리케이션",
  keywords: ["감정", "일기", "기분", "추적", "웰빙"],
  authors: [{ name: "감정 일기 팀" }],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
