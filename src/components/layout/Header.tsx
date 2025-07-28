"use client";

import { useState } from "react";
import { Heart, Moon, Sun } from "lucide-react";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
    // 다크모드 로직 구현 (추후)
  };

  return (
    <header className="w-full bg-white">
      <div className="w-full max-w-[1168px] mx-auto px-5 py-4">
        <nav className="flex justify-between items-center h-[60px]">
          {/* 로고 */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-full">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-black">만지의 다이어리</h1>
          </div>

          {/* 다크모드 토글 */}
          <div className="flex items-center space-x-2">
            <span className="text-base font-normal text-gray-900">
              다크모드
            </span>
            <button
              onClick={handleToggleDarkMode}
              className={`relative flex items-center w-[58px] h-8 px-1 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              <div
                className={`flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  isDarkMode ? "translate-x-[26px]" : "translate-x-0"
                }`}
              >
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-gray-700" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
