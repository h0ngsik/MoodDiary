"use client";

import { PhotoGallery } from "@/components/photo/PhotoGallery";
import { PhotoHeader } from "@/components/photo/PhotoHeader";

export default function PhotosPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <div className="w-full max-w-[1168px] mx-auto px-5 py-8">
        <PhotoHeader />
        <PhotoGallery />
      </div>
    </main>
  );
}
