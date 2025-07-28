"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "small" | "large"; // small: 480x200, large: 640x560
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = "small",
}: ModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // 모달이 열릴 때 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // 모달이 닫힐 때 스크롤 복구
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 모달 크기 설정
  const modalSizes = {
    small: {
      width: 480,
      height: 200,
    },
    large: {
      width: 640,
      height: 560,
    },
  };

  const { width, height } = modalSizes[size];

  return (
    <div className="fixed inset-0 z-50">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* 모달 컨테이너 */}
      <div
        className="bg-white rounded-3xl animate-fade-in"
        style={{
          position: "absolute",
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${width}px`,
          maxWidth: size === "large" ? "760px" : `${width}px`,
          left: `calc(50% - ${width}px/2)`,
          top: `calc(50% - ${height}px/2)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
