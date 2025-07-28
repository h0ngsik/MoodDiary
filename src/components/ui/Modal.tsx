"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // 모달 열릴 때 스크롤 방지
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = ""; // 모달 닫힐 때 스크롤 복구
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* 모달 컨텐츠 */}
      <div className="relative z-10 max-h-[90vh] overflow-auto">{children}</div>
    </div>
  );
};
