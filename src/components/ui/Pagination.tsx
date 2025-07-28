"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 표시할 페이지 번호 계산 (최대 5개)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(totalPages, 5); // 최대 5페이지까지 표시

    if (totalPages <= 5) {
      // 전체 페이지가 5페이지 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 전체 페이지가 5페이지 초과면 현재 페이지 중심으로 표시
      let start = Math.max(currentPage - 2, 1);
      let end = Math.min(start + 4, totalPages);

      // 끝부분 조정
      if (end === totalPages) {
        start = Math.max(end - 4, 1);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2 h-8">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-6 h-6 flex items-center justify-center disabled:opacity-50"
      >
        <ChevronLeft
          className={currentPage === 1 ? "text-[#C7C7C7]" : "text-[#333333]"}
          size={24}
        />
      </button>

      {/* 페이지 번호 */}
      <div className="flex items-center gap-4 mx-4">
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-base ${
              currentPage === pageNum
                ? "bg-[#F2F2F2] font-medium text-black"
                : "bg-white font-normal text-[#777777]"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-6 h-6 flex items-center justify-center disabled:opacity-50"
      >
        <ChevronRight
          className={
            currentPage === totalPages ? "text-[#C7C7C7]" : "text-[#333333]"
          }
          size={24}
        />
      </button>
    </div>
  );
};
