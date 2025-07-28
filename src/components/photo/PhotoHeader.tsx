"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadPhotoModal } from "./UploadPhotoModal";

export const PhotoHeader = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="w-full flex flex-col gap-8 mb-8">
        {/* 필터 */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-base"
              defaultValue="latest"
            >
              <option value="latest">최신순111</option>
              <option value="oldest">오래된순222</option>
            </select>
          </div>
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            onClick={() => setIsUploadModalOpen(true)}
          >
            사진 추가
          </button>
        </div>
      </div>

      <UploadPhotoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
};
