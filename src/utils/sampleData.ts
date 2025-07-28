import type { MoodEntry } from "@/types/mood";

// 샘플 감정 일기 데이터
export const SAMPLE_MOOD_ENTRIES: MoodEntry[] = [
  {
    id: "sample_1",
    date: "2024-03-12",
    moodType: "happy",
    intensity: 4,
    note: "오늘은 친구들과 함께 맛있는 음식을 먹으며 즐거운 시간을 보냈어요! 정말 행복한 하루였습니다.",
    tags: ["친구", "맛집", "행복"],
    createdAt: "2024-03-12T10:30:00Z",
    updatedAt: "2024-03-12T10:30:00Z",
  },
  {
    id: "sample_2",
    date: "2024-03-12",
    moodType: "excited",
    intensity: 5,
    note: "새로운 프로젝트를 시작하게 되어서 너무 기대돼요. 열심히 해서 좋은 결과를 만들어보고 싶습니다.",
    tags: ["프로젝트", "기대", "도전"],
    createdAt: "2024-03-12T14:20:00Z",
    updatedAt: "2024-03-12T14:20:00Z",
  },
  {
    id: "sample_3",
    date: "2024-03-12",
    moodType: "calm",
    intensity: 3,
    note: "오늘은 조용히 집에서 책을 읽으며 평온한 시간을 보냈어요. 가끔은 이런 여유로운 시간이 필요한 것 같아요.",
    tags: ["독서", "휴식", "평온"],
    createdAt: "2024-03-12T19:00:00Z",
    updatedAt: "2024-03-12T19:00:00Z",
  },
  {
    id: "sample_4",
    date: "2024-03-12",
    moodType: "sad",
    intensity: 2,
    note: "좋아하던 카페가 문을 닫는다는 소식을 들었어요. 추억이 많은 곳이라 아쉬운 마음이 듭니다.",
    tags: ["아쉬움", "추억", "변화"],
    createdAt: "2024-03-12T16:45:00Z",
    updatedAt: "2024-03-12T16:45:00Z",
  },
];

// 스토어에 샘플 데이터를 추가하는 함수
export const loadSampleData = (): void => {
  const existingData = localStorage.getItem("mood-diary-storage");

  if (!existingData) {
    const sampleData = {
      state: {
        moodEntries: SAMPLE_MOOD_ENTRIES,
      },
      version: 0,
    };
    localStorage.setItem("mood-diary-storage", JSON.stringify(sampleData));
  }
};
