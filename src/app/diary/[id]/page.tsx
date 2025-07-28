"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMoodStore } from "@/stores/moodStore";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Copy, X, ArrowLeft } from "lucide-react";
import { MOOD_CONFIG } from "@/constants/moods";
import type { MoodType } from "@/types/mood";
import { RadioGroup, RadioButton } from "@/components/ui/Radio";
import { Toast } from "@/components/ui/Toast";
import { DeleteMoodModal } from "@/components/mood/DeleteMoodModal";

export default function DiaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    moodEntries,
    updateMoodEntry,
    deleteMoodEntry,
    addRetrospect,
    deleteRetrospect,
  } = useMoodStore();
  const entry = moodEntries.find((entry) => entry.id === params.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMood, setEditedMood] = useState<MoodType | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [retrospectContent, setRetrospectContent] = useState("");

  if (!entry) {
    return <div>일기를 찾을 수 없습니다.</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleCopyContent = () => {
    if (entry.note) {
      navigator.clipboard.writeText(entry.note);
      setShowToast(true);
    }
  };

  // 감정 설정 가져오기 (기본값: neutral)
  const moodConfig =
    MOOD_CONFIG[entry.moodType as MoodType] || MOOD_CONFIG.neutral;

  // 수정 모드 시작
  const handleEdit = () => {
    setEditedMood(entry.moodType as MoodType);
    setEditedTitle(entry.note || "");
    setEditedContent(entry.note || "");
    setIsEditing(true);
  };

  // 수정 취소
  const handleCancel = () => {
    setIsEditing(false);
    setEditedMood(null);
    setEditedTitle("");
    setEditedContent("");
  };

  // 수정 완료
  const handleUpdate = () => {
    if (!editedMood || !editedTitle.trim()) {
      alert("기분과 제목을 입력해주세요.");
      return;
    }

    if (entry.id) {
      updateMoodEntry(entry.id, {
        moodType: editedMood,
        note: editedTitle.trim(),
      });
      setIsEditing(false);
      router.refresh(); // 페이지 새로고침
    }
  };

  // 삭제 확인
  const handleConfirmDelete = () => {
    if (entry.id) {
      deleteMoodEntry(entry.id);
      router.push("/"); // 홈으로 이동
    }
  };

  // 회고 추가
  const handleAddRetrospect = () => {
    if (!retrospectContent.trim()) return;
    addRetrospect(entry.id, retrospectContent.trim());
    setRetrospectContent("");
    router.refresh();
  };

  // 회고 영역 컴포넌트화
  const RetrospectSection = () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">회고</h3>

      {/* 회고 입력 */}
      <div className="flex gap-4">
        <input
          type="text"
          value={retrospectContent}
          onChange={(e) => setRetrospectContent(e.target.value)}
          placeholder="회고를 남겨보세요."
          className="flex-1 px-4 py-3 border border-[#D4D3D3] rounded-lg text-base disabled:bg-gray-100 disabled:text-gray-400"
          disabled={isEditing}
        />
        <button
          onClick={handleAddRetrospect}
          disabled={isEditing}
          className="w-[51px] h-12 flex items-center justify-center rounded-lg disabled:bg-gray-300 enabled:bg-black"
        >
          <span className="text-lg font-semibold text-white">입력</span>
        </button>
      </div>

      {/* 회고 목록 */}
      {entry.retrospect && entry.retrospect.length > 0 && (
        <div className="flex flex-col gap-3">
          {entry.retrospect.map((item) => (
            <div
              key={item.id}
              className="group flex flex-wrap items-center justify-between pb-3 border-b border-[#E4E4E4]"
            >
              <div className="flex items-center gap-x-3">
                <span className="text-base text-black">{item.content}</span>
                <span className="text-base text-[#777777]">
                  [{formatDate(item.date)}]
                </span>
              </div>
              {!isEditing && (
                <button
                  onClick={() => deleteRetrospect(entry.id, item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex flex-col items-center py-6 gap-6">
        <div className="w-full max-w-[1168px] flex flex-col gap-6">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로</span>
          </button>

          {!isEditing ? (
            <>
              {/* 내용 영역 */}
              <div className="flex flex-col gap-6 pb-4 border-b border-black">
                {/* 제목 영역 */}
                <div className="flex flex-col gap-4">
                  <div className="border-b-2 border-black pb-3">
                    <h1 className="text-[22px] font-bold leading-6 tracking-[-0.01em]">
                      {entry.note}
                    </h1>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={`/assets/images/mood_${
                          entry.moodType === "neutral"
                            ? "other"
                            : entry.moodType
                        }.png`}
                        alt={moodConfig.label}
                        className="w-8 h-8"
                      />
                      <span
                        className="text-xl font-semibold tracking-[-0.01em]"
                        style={{ color: moodConfig.color }}
                      >
                        {moodConfig.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#919191] text-sm">
                      <span>{formatDate(entry.date)}</span>
                      <span>작성</span>
                    </div>
                  </div>
                </div>

                {/* 내용 */}
                <div className="flex flex-col gap-3">
                  <h2 className="font-semibold text-base">내용</h2>
                  <p className="text-base text-[#333333] min-h-[100px]">
                    {entry.note}
                  </p>
                </div>

                {/* 내용 복사 버튼 */}
                <div className="flex justify-end">
                  <button
                    onClick={handleCopyContent}
                    className="flex items-center gap-2 text-base text-[#1C1C1C]"
                  >
                    <Copy className="w-6 h-6 text-[#5F6368]" />
                    <span>내용 복사</span>
                  </button>
                </div>

                {/* 수정/삭제 버튼 */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleEdit}
                    className="px-[10px] py-2 border border-[#D4D3D3] rounded-lg text-lg font-medium"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-[10px] py-2 border border-[#D4D3D3] rounded-lg text-lg font-medium"
                  >
                    삭제
                  </button>
                </div>
              </div>

              {/* 회고 영역 */}
              <RetrospectSection />
            </>
          ) : (
            <>
              {/* 수정 모드 */}
              <div className="flex flex-col gap-6">
                {/* 기분 선택 영역 */}
                <div className="flex flex-col gap-4 pb-4 border-b border-black">
                  <h3 className="text-xl font-semibold">
                    오늘 기분은 어땟나요?
                  </h3>
                  <RadioGroup<MoodType>
                    value={editedMood}
                    onChange={setEditedMood}
                    className="flex flex-wrap gap-5"
                  >
                    {Object.entries(MOOD_CONFIG).map(([value, config]) => (
                      <RadioButton<MoodType>
                        key={value}
                        value={value as MoodType}
                        label={config.label}
                      />
                    ))}
                  </RadioGroup>

                  {/* 제목 입력 */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#333333]">
                      제목
                    </label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-[#D4D3D3] rounded-lg text-base"
                    />
                  </div>

                  {/* 내용 입력 */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#333333]">
                      내용
                    </label>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-32 px-4 py-3 border border-[#D4D3D3] rounded-lg text-base resize-none"
                    />
                  </div>

                  {/* 버튼 영역 */}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleCancel}
                      className="w-[104px] h-12 flex items-center justify-center border border-black rounded-lg"
                    >
                      <span className="text-lg font-semibold text-[#1C1C1C]">
                        취소
                      </span>
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="w-[104px] h-12 flex items-center justify-center bg-black rounded-lg"
                    >
                      <span className="text-lg font-semibold text-[#F2F2F2]">
                        수정하기
                      </span>
                    </button>
                  </div>
                </div>

                {/* 회고 영역 */}
                <RetrospectSection />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Toast */}
      <Toast
        message="내용이 복사되었습니다."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* 삭제 확인 모달 */}
      <DeleteMoodModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
