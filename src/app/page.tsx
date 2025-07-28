"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Banner } from "@/components/layout/Banner";
import { MoodHistory } from "@/components/mood/MoodHistory";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { loadSampleData } from "@/utils/sampleData";

export default function Home() {
  // 샘플 데이터 로드
  useEffect(() => {
    loadSampleData();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Banner />
      <div className="w-full max-w-[1168px] mx-auto px-5 py-5">
        <MoodHistory />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
