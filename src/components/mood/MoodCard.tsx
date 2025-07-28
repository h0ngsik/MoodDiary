"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { MOOD_CONFIG } from "@/constants/moods";
import type { MoodEntry, MoodType } from "@/types/mood";
import { DeleteMoodModal } from "./DeleteMoodModal";

interface MoodCardProps {
  entry: MoodEntry;
  onDelete: (id: string) => void;
}

export const MoodCard = ({ entry, onDelete }: MoodCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 감정 설정 가져오기 (기본값: neutral)
  const moodConfig =
    MOOD_CONFIG[entry.moodType as MoodType] || MOOD_CONFIG.neutral;

  // 이미지 경로
  const getMoodImage = (type: MoodType) => {
    // neutral 타입일 경우 other.png 사용
    if (type === "neutral") {
      return "/assets/images/mood_other.png";
    }
    return `/assets/images/mood_${type.toLowerCase()}.png`;
  };

  // 날짜 포맷
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 링크 이동 방지
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(entry.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Link href={`/diary/${entry.id}`}>
        <div className="group flex flex-col bg-white rounded-2xl w-[274px] min-w-[152px] h-[296px] shadow-sm transition-transform duration-300 hover:scale-[1.02]">
          {/* 감정 이미지 영역 */}
          <div className="relative w-full h-[208px] rounded-t-2xl overflow-hidden">
            {/* 감정별 이미지 */}
            <div className="w-full h-full transition-all duration-300 group-hover:blur-[2px]">
              <Image
                src={getMoodImage(entry.moodType as MoodType)}
                alt={`${moodConfig.label} 이미지`}
                fill
                className="object-cover"
                sizes="274px"
                priority
              />
            </div>

            {/* 삭제 버튼 */}
            <button
              onClick={handleDeleteClick}
              className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="일기 삭제"
            >
              <X className="w-3 h-3 text-black" />
            </button>
          </div>

          {/* 감정 정보 영역 */}
          <div className="flex flex-col px-2 gap-2 h-14 pt-4">
            {/* 감정 타입과 날짜 */}
            <div className="flex justify-between items-center">
              <span
                className="text-sm font-semibold"
                style={{ color: moodConfig.color }}
              >
                {moodConfig.label}
              </span>
              <span className="text-sm text-gray-500 font-normal">
                {formatDate(entry.date)}
              </span>
            </div>

            {/* 제목 */}
            <div className="flex items-center">
              <h3 className="text-lg font-bold text-black truncate flex-1">
                {entry.note || "오늘의 감정"}
              </h3>
            </div>
          </div>
        </div>
      </Link>

      {/* 삭제 확인 모달 */}
      <DeleteMoodModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
