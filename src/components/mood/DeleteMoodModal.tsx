"use client";

import { Modal } from "@/components/ui/Modal";

interface DeleteMoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteMoodModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteMoodModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <div className="flex flex-col items-center p-6 gap-10">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-start gap-4 w-[432px]">
          <h2 className="w-full text-2xl font-bold text-center leading-6 tracking-[-0.01em] text-black">
            일기 삭제
          </h2>
          <p className="w-full text-xl font-medium text-center leading-6 tracking-[-0.01em] text-[#333333]">
            일기를 삭제 하시겠어요?
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center gap-[21px]">
          <button
            onClick={onClose}
            className="flex justify-center items-center px-[10px] py-2 w-[104px] h-12 bg-white border border-black rounded-lg"
          >
            <span className="text-lg font-semibold leading-6 tracking-[-0.01em] text-[#1C1C1C]">
              취소
            </span>
          </button>
          <button
            onClick={onConfirm}
            className="flex justify-center items-center px-[10px] py-2 w-[104px] h-12 bg-black rounded-lg"
          >
            <span className="text-lg font-semibold leading-6 tracking-[-0.01em] text-[#F2F2F2]">
              삭제
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
