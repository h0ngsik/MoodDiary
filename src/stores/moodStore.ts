"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { MoodEntry, MoodType, Retrospect } from "@/types/mood";

// localStorage 키 상수
const STORAGE_KEY = "mood-storage";

// localStorage 유틸리티 함수
const storage = {
  // 데이터 저장
  setItem: (data: MoodEntry[]) => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Failed to save mood entries:", error);
      return false;
    }
  },

  // 데이터 불러오기
  getItem: (): MoodEntry[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load mood entries:", error);
      return [];
    }
  },

  // 데이터 삭제
  removeItem: () => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("Failed to remove mood entries:", error);
      return false;
    }
  },
};

interface MoodStore {
  moodEntries: MoodEntry[];
  isLoading: boolean;
  currentEntry: MoodEntry | null;
  addMoodEntry: (entry: Omit<MoodEntry, "id" | "date">) => void;
  updateMoodEntry: (id: string, entry: Partial<MoodEntry>) => void;
  deleteMoodEntry: (id: string) => void;
  addRetrospect: (moodId: string, content: string) => void;
  deleteRetrospect: (moodId: string, retrospectId: string) => void;
  clearAllEntries: () => void;
}

export const useMoodStore = create<MoodStore>()(
  persist(
    (set) => ({
      moodEntries: [],
      isLoading: false,
      currentEntry: null,

      addMoodEntry: (entry) => {
        const newEntry: MoodEntry = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          ...entry,
          retrospect: [],
        };
        set((state) => {
          const newEntries = [newEntry, ...state.moodEntries];
          storage.setItem(newEntries);
          return { moodEntries: newEntries };
        });
      },

      updateMoodEntry: (id, updatedEntry) => {
        set((state) => {
          const newEntries = state.moodEntries.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  ...updatedEntry,
                  date: entry.date, // 날짜는 유지
                }
              : entry
          );
          storage.setItem(newEntries);
          return { moodEntries: newEntries };
        });
      },

      deleteMoodEntry: (id) => {
        set((state) => {
          const newEntries = state.moodEntries.filter(
            (entry) => entry.id !== id
          );
          storage.setItem(newEntries);
          return { moodEntries: newEntries };
        });
      },

      addRetrospect: (moodId, content) => {
        const newRetrospect: Retrospect = {
          id: crypto.randomUUID(),
          content,
          date: new Date().toISOString(),
        };

        set((state) => {
          const newEntries = state.moodEntries.map((entry) =>
            entry.id === moodId
              ? {
                  ...entry,
                  retrospect: [...(entry.retrospect || []), newRetrospect],
                }
              : entry
          );
          storage.setItem(newEntries);
          return { moodEntries: newEntries };
        });
      },

      deleteRetrospect: (moodId, retrospectId) => {
        set((state) => {
          const newEntries = state.moodEntries.map((entry) =>
            entry.id === moodId
              ? {
                  ...entry,
                  retrospect:
                    entry.retrospect?.filter(
                      (item) => item.id !== retrospectId
                    ) || [],
                }
              : entry
          );
          storage.setItem(newEntries);
          return { moodEntries: newEntries };
        });
      },

      clearAllEntries: () => {
        storage.removeItem();
        set({ moodEntries: [] });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => ({
        setItem: (key: string, value: unknown) => {
          if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
          }
        },
        getItem: (key: string) => {
          if (typeof window !== "undefined") {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
          }
          return null;
        },
        removeItem: (key: string) => {
          if (typeof window !== "undefined") {
            localStorage.removeItem(key);
          }
        },
      })),
      // 스키마 변경 시 마이그레이션
      migrate: (persistedState: any) => {
        // 기존 데이터의 감정 타입 변환
        const moodTypeMap: Record<string, MoodType> = {
          calm: "neutral",
          excited: "surprised",
        };

        const migratedEntries = persistedState.moodEntries.map(
          (entry: MoodEntry) => ({
            ...entry,
            moodType: moodTypeMap[entry.moodType] || entry.moodType,
            retrospect: entry.retrospect || [],
          })
        );

        if (typeof window !== "undefined") {
          storage.setItem(migratedEntries);
        }

        return {
          ...persistedState,
          moodEntries: migratedEntries,
        };
      },
    }
  )
);
