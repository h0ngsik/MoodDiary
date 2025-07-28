import type { MoodType } from "@/types/mood";

// 감정 타입별 한글 이름과 색상 매핑
export const MOOD_CONFIG = {
  happy: {
    label: "행복해요",
    color: "#EA5757",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    emoji: "😊",
  },
  sad: {
    label: "슬퍼요",
    color: "#28B4E1",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    emoji: "😢",
  },
  angry: {
    label: "화나요",
    color: "#EA5757",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    emoji: "😠",
  },
  surprised: {
    label: "놀랐어요",
    color: "#D59029",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    emoji: "😮",
  },
  neutral: {
    label: "기타",
    color: "#777777",
    bgColor: "bg-gray-50",
    textColor: "text-gray-600",
    emoji: "😐",
  },
} as const;

// 감정 타입 배열 (순서 유지)
export const MOOD_TYPES: MoodType[] = [
  "happy",
  "sad",
  "angry",
  "surprised",
  "neutral",
];

// 감정 강도별 설명
export const INTENSITY_LABELS = {
  1: "매우 약함",
  2: "약함",
  3: "보통",
  4: "강함",
  5: "매우 강함",
} as const;

// 필터 탭 옵션
export const FILTER_TABS = [
  { id: "all", label: "일기보관함", isActive: true },
  { id: "statistics", label: "통계보기", isActive: false },
] as const;
