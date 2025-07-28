"use client";

import { Modal } from "@/components/ui/Modal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center p-6 gap-10">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-start w-[432px] gap-4">
          <h2 className="w-full text-2xl font-bold text-center leading-6 tracking-[-0.01em] text-black">
            일기 등록 완료
          </h2>
          <p className="w-full text-xl font-medium text-center leading-6 tracking-[-0.01em] text-[#333333]">
            등록이 완료 되었습니다.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="w-[432px] h-12">
          <button
            onClick={onClose}
            className="w-full h-full flex items-center justify-center bg-black rounded-lg"
          >
            <span className="text-lg font-semibold leading-6 tracking-[-0.01em] text-white">
              확인
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
