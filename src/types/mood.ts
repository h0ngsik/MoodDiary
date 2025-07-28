// 감정 타입 정의
export type MoodType = "happy" | "sad" | "angry" | "surprised" | "neutral";

// 감정 강도 (1-5 스케일)
export type MoodIntensity = 1 | 2 | 3 | 4 | 5;

// 감정 기록 인터페이스
export interface MoodEntry {
  id: string;
  date: string; // ISO 8601 format
  moodType: MoodType;
  intensity: MoodIntensity;
  note?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  retrospect?: Retrospect[];
}

export interface Retrospect {
  id: string;
  content: string;
  date: string;
}

// 감정 통계 인터페이스
export interface MoodStats {
  totalEntries: number;
  averageIntensity: number;
  mostFrequentMood: MoodType;
  moodCounts: Record<MoodType, number>;
  weeklyAverage: number;
}

// 감정 필터 옵션
export interface MoodFilter {
  startDate?: string;
  endDate?: string;
  moodTypes?: MoodType[];
  minIntensity?: MoodIntensity;
  maxIntensity?: MoodIntensity;
}

// 감정 폼 데이터
export interface MoodFormData {
  moodType: MoodType;
  intensity: MoodIntensity;
  note: string;
  tags: string[];
}
