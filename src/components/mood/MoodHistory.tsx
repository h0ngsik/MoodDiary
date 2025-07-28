"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useMoodStore } from "@/stores/moodStore";
import { MoodCard } from "./MoodCard";
import { Pagination } from "@/components/ui/Pagination";
import { WriteMoodModal } from "./WriteMoodModal";
import { MOOD_CONFIG } from "@/constants/moods";
import { PhotoGallery } from "../photo/PhotoGallery";
import { UploadPhotoModal } from "../photo/UploadPhotoModal";
import type { MoodType } from "@/types/mood";

// 탭 정의
const TABS = [
  { id: "diary", label: "일기 보관함" },
  { id: "photo", label: "사진 보관함" },
] as const;

// 정렬 옵션
const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];
type TabType = (typeof TABS)[number]["id"];

export const MoodHistory = () => {
  const { moodEntries, deleteMoodEntry } = useMoodStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [selectedMood, setSelectedMood] = useState<MoodType | "all">("all");
  const [activeTab, setActiveTab] = useState<TabType>("diary");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const itemsPerPage = 12;

  // 필터링 및 정렬 로직
  const filteredAndSortedEntries = moodEntries
    .filter((entry) => {
      const matchesSearch = entry.note
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesMood =
        selectedMood === "all" || entry.moodType === selectedMood;

      return matchesSearch && matchesMood;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOption === "latest" ? dateB - dateA : dateA - dateB;
    });

  const totalPages = Math.ceil(filteredAndSortedEntries.length / itemsPerPage);

  const currentItems = filteredAndSortedEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (mood: MoodType | "all") => {
    setSelectedMood(mood);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedMood("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* 탭 영역 */}
      <div className="flex justify-start">
        <div className="flex items-center gap-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-2 py-3 text-2xl font-bold transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "diary" ? (
        <>
          {/* 검색 및 필터 영역 */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* 감정 필터 드롭다운 */}
              <div className="relative min-w-[120px]">
                <select
                  value={selectedMood}
                  onChange={(e) =>
                    handleFilterChange(e.target.value as MoodType | "all")
                  }
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">전체</option>
                  {Object.entries(MOOD_CONFIG).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 정렬 드롭다운 */}
              <div className="relative min-w-[120px]">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 검색 입력 */}
              <div className="relative flex-1 max-w-[360px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="감정이나 내용을 검색해보세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* 일기 추가 버튼 */}
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="flex items-center gap-1 px-4 py-2 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <Plus className="w-6 h-6" />
              일기쓰기
            </button>
          </div>

          {/* 감정 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.length > 0 ? (
              currentItems.map((entry) => (
                <MoodCard
                  key={entry.id}
                  entry={entry}
                  onDelete={deleteMoodEntry}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-lg font-medium">
                  {searchQuery || selectedMood !== "all"
                    ? "검색 결과가 없습니다"
                    : "아직 작성된 감정 일기가 없습니다"}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {searchQuery || selectedMood !== "all"
                    ? "다른 검색어나 필터를 시도해보세요"
                    : "첫 번째 감정을 기록해보세요!"}
                </p>
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          {currentItems.length > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.max(1, totalPages)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {/* 사진보관함 필터 영역 */}
          <div className="flex justify-between items-center">
            <div className="relative min-w-[120px]">
              <select
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-base"
                defaultValue="latest"
              >
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
            </div>
            <button
              className="flex items-center gap-1 px-4 py-2 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus className="w-6 h-6" />
              사진 추가
            </button>
          </div>
          <PhotoGallery />
        </>
      )}

      {/* 모달 */}
      <WriteMoodModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
      />
      <UploadPhotoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};
