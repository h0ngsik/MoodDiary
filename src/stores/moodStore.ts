"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MoodEntry, MoodType, Retrospect } from "@/types/mood";

interface MoodStore {
  moodEntries: MoodEntry[];
  isLoading: boolean;
  currentEntry: MoodEntry | null;
  addMoodEntry: (entry: Omit<MoodEntry, "id" | "date">) => void;
  updateMoodEntry: (id: string, entry: Partial<MoodEntry>) => void;
  deleteMoodEntry: (id: string) => void;
  addRetrospect: (moodId: string, content: string) => void;
  deleteRetrospect: (moodId: string, retrospectId: string) => void;
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
        set((state) => ({
          moodEntries: [newEntry, ...state.moodEntries],
        }));
      },

      updateMoodEntry: (id, updatedEntry) => {
        set((state) => ({
          moodEntries: state.moodEntries.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  ...updatedEntry,
                  date: entry.date, // 날짜는 유지
                }
              : entry
          ),
        }));
      },

      deleteMoodEntry: (id) => {
        set((state) => ({
          moodEntries: state.moodEntries.filter((entry) => entry.id !== id),
        }));
      },

      addRetrospect: (moodId, content) => {
        const newRetrospect: Retrospect = {
          id: crypto.randomUUID(),
          content,
          date: new Date().toISOString(),
        };

        set((state) => ({
          moodEntries: state.moodEntries.map((entry) =>
            entry.id === moodId
              ? {
                  ...entry,
                  retrospect: [...(entry.retrospect || []), newRetrospect],
                }
              : entry
          ),
        }));
      },

      deleteRetrospect: (moodId, retrospectId) => {
        set((state) => ({
          moodEntries: state.moodEntries.map((entry) =>
            entry.id === moodId
              ? {
                  ...entry,
                  retrospect:
                    entry.retrospect?.filter(
                      (item) => item.id !== retrospectId
                    ) || [],
                }
              : entry
          ),
        }));
      },
    }),
    {
      name: "mood-storage",
      // 스키마 변경 시 마이그레이션
      migrate: (persistedState: any) => {
        // 기존 데이터의 감정 타입 변환
        const moodTypeMap: Record<string, MoodType> = {
          calm: "neutral",
          excited: "surprised",
        };

        return {
          ...persistedState,
          moodEntries: persistedState.moodEntries.map((entry: MoodEntry) => ({
            ...entry,
            moodType: moodTypeMap[entry.moodType] || entry.moodType,
            retrospect: entry.retrospect || [],
          })),
        };
      },
    }
  )
);
