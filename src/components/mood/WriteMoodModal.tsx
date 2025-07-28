"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { RadioGroup, RadioButton } from "@/components/ui/Radio";
import { useMoodStore } from "@/stores/moodStore";
import type { MoodType } from "@/types/mood";
import { SuccessModal } from "./SuccessModal";
import { CancelModal } from "./CancelModal";

interface WriteMoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 기분 옵션
const MOOD_OPTIONS = [
  { value: "happy", label: "행복해요" },
  { value: "sad", label: "슬퍼요" },
  { value: "angry", label: "화나요" },
  { value: "surprised", label: "놀랐어요" },
  { value: "neutral", label: "기타" },
] as const;

export const WriteMoodModal = ({ isOpen, onClose }: WriteMoodModalProps) => {
  const { addMoodEntry } = useMoodStore();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // 입력값 초기화
  const resetForm = () => {
    setSelectedMood(null);
    setTitle("");
    setContent("");
  };

  // 모달 닫기 시도
  const handleCloseAttempt = () => {
    // 입력된 내용이 있는 경우에만 취소 모달 표시
    if (selectedMood || title.trim() || content.trim()) {
      setIsCancelModalOpen(true);
    } else {
      onClose();
    }
  };

  // 취소 확인
  const handleCancelConfirm = () => {
    setIsCancelModalOpen(false);
    resetForm();
    onClose();
  };

  // 일기 등록
  const handleSubmit = () => {
    if (!selectedMood) {
      alert("기분을 선택해주세요.");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    addMoodEntry({
      moodType: selectedMood,
      intensity: 3, // 기본값
      note: title,
      tags: [],
    });

    // 성공 모달 표시
    setIsSuccessModalOpen(true);
  };

  // 성공 모달 닫기
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    resetForm();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseAttempt} size="large">
        <div className="flex flex-col items-center p-6 gap-10">
          {/* 제목 */}
          <h2 className="w-[592px] text-2xl font-bold leading-6 tracking-[-0.01em] text-black">
            일기 쓰기
          </h2>

          <div className="flex flex-col gap-10 w-[592px]">
            {/* 기분 선택 영역 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold leading-6 tracking-[-0.01em] text-black">
                오늘 기분은 어땟나요?
              </h3>
              <RadioGroup<MoodType>
                value={selectedMood}
                onChange={setSelectedMood}
                className="flex flex-wrap gap-5"
              >
                {MOOD_OPTIONS.map((option) => (
                  <RadioButton<MoodType>
                    key={option.value}
                    value={option.value as MoodType}
                    label={option.label}
                    className="flex items-center gap-2"
                  />
                ))}
              </RadioGroup>
            </div>

            {/* 텍스트 입력 영역 */}
            <div className="flex flex-col gap-6">
              {/* 제목 입력 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#333333]">
                  제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력해 주세요."
                  className="w-full h-12 px-4 bg-white border border-[#D4D3D3] rounded-lg text-base font-medium placeholder-[#ABABAB] focus:outline-none focus:border-black"
                />
              </div>

              {/* 내용 입력 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#333333]">
                  내용
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용을 입력해 주세요."
                  className="w-full h-32 px-4 py-3 bg-white border border-[#D4D3D3] rounded-lg text-base font-medium placeholder-[#ABABAB] resize-none focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-4">
            <button
              onClick={handleCloseAttempt}
              className="w-[104px] h-12 flex items-center justify-center border border-black rounded-lg"
            >
              <span className="text-lg font-semibold text-[#1C1C1C]">닫기</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedMood || !title.trim() || !content.trim()}
              className={`w-[104px] h-12 flex items-center justify-center rounded-lg ${
                !selectedMood || !title.trim() || !content.trim()
                  ? "bg-[#C7C7C7] cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              <span className="text-lg font-semibold text-[#F2F2F2]">
                등록하기
              </span>
            </button>
          </div>
        </div>
      </Modal>

      {/* 성공 모달 */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
      />

      {/* 취소 확인 모달 */}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
};
