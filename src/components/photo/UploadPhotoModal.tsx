"use client";

import { useState, useRef, useEffect } from "react";
import { usePhotoStore } from "@/stores/photoStore";
import { Modal } from "@/components/ui/Modal";
import Image from "next/image";

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadPhotoModal = ({
  isOpen,
  onClose,
}: UploadPhotoModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addPhoto } = usePhotoStore();

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl((prevUrl) => {
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
        }
        return null;
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewUrl(base64String);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !previewUrl) return;

    try {
      const newPhoto = {
        id: Date.now().toString(),
        url: previewUrl,
        createdAt: new Date().toISOString(),
      };

      addPhoto(newPhoto);
      onClose();
    } catch (error) {
      console.error("Failed to upload photo:", error);
      alert("사진 업로드에 실패했습니다.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-[427px] overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">사진 업로드</h2>

          {/* 미리보기 영역 */}
          <div
            className="w-full aspect-square bg-gray-100 rounded-xl mb-4 relative cursor-pointer overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded-xl"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 text-sm">클릭하여 사진 선택</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-sm"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="px-3 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              업로드
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
