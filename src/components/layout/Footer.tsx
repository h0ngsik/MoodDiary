"use client";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100">
      <div className="w-full max-w-[1168px] mx-auto px-5 py-6">
        <div className="flex flex-col gap-8">
          {/* 로고 */}
          <h2 className="text-xl font-bold text-black">민지의 다이어리</h2>

          {/* 정보 */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-normal text-gray-600">
              대표 : 민지 | 개발팀 : (주)민지
            </p>
            <p className="text-sm font-light text-gray-500">
              Copyright © 2024. 민지 Co., Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
