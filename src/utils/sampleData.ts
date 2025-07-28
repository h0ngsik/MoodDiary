import { useMoodStore } from "@/stores/moodStore";
import type { MoodType, MoodIntensity } from "@/types/mood";

export const loadSampleData = () => {
  const { addMoodEntry } = useMoodStore.getState();

  const sampleData = [
    {
      id: "sample_1",
      date: "2024-03-13",
      moodType: "happy" as MoodType,
      intensity: 4 as MoodIntensity,
      note: "오늘은 날씨가 너무 좋아서 기분이 좋았어요. 점심에는 맛있는 파스타도 먹고, 오후에는 동료들과 즐거운 대화를 나눴습니다.",
      tags: ["날씨", "맛집", "대화"],
      createdAt: "2024-03-13T09:00:00Z",
      updatedAt: "2024-03-13T09:00:00Z",
    },
    {
      id: "sample_2",
      date: "2024-03-12",
      moodType: "surprised" as MoodType,
      intensity: 5 as MoodIntensity,
      note: "새로운 프로젝트를 시작하게 되어서 너무 기대돼요. 열심히 해서 좋은 결과를 만들어보고 싶습니다.",
      tags: ["프로젝트", "기대", "도전"],
      createdAt: "2024-03-12T15:30:00Z",
      updatedAt: "2024-03-12T15:30:00Z",
    },
    {
      id: "sample_3",
      date: "2024-03-11",
      moodType: "sad" as MoodType,
      intensity: 2 as MoodIntensity,
      note: "오늘은 조금 피곤하고 우울했어요. 내일은 더 나아질 거예요.",
      tags: ["피곤", "우울"],
      createdAt: "2024-03-11T20:15:00Z",
      updatedAt: "2024-03-11T20:15:00Z",
    },
  ];

  sampleData.forEach((entry) => {
    const { id, date, ...moodEntry } = entry;
    addMoodEntry(moodEntry);
  });
};
