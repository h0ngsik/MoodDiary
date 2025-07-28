"use client";

import { Modal } from "@/components/ui/Modal";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelModal = ({
  isOpen,
  onClose,
  onConfirm,
}: CancelModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center p-6 gap-10">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-start w-[432px] gap-4">
          <h2 className="w-full text-2xl font-bold text-center leading-6 tracking-[-0.01em] text-black">
            일기 등록 취소
          </h2>
          <p className="w-full text-xl font-medium text-center leading-6 tracking-[-0.01em] text-[#333333]">
            일기 등록을 취소 하시겠어요?
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-[21px]">
          <button
            onClick={onClose}
            className="w-[104px] h-12 flex items-center justify-center bg-white border border-black rounded-lg"
          >
            <span className="text-lg font-semibold leading-6 tracking-[-0.01em] text-[#1C1C1C]">
              계속 작성
            </span>
          </button>
          <button
            onClick={onConfirm}
            className="w-[104px] h-12 flex items-center justify-center bg-black rounded-lg"
          >
            <span className="text-lg font-semibold leading-6 tracking-[-0.01em] text-[#F2F2F2]">
              등록 취소
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
