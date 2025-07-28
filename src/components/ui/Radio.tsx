"use client";

import { createContext, useContext } from "react";

interface RadioGroupContextType<T extends string> {
  value: T | null;
  onChange: (value: T) => void;
}

const RadioGroupContext = createContext<RadioGroupContextType<any> | undefined>(
  undefined
);

interface RadioGroupProps<T extends string> extends RadioGroupContextType<T> {
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup<T extends string>({
  children,
  value,
  onChange,
  className,
}: RadioGroupProps<T>) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange }}>
      <div className={className}>{children}</div>
    </RadioGroupContext.Provider>
  );
}

interface RadioButtonProps<T extends string> {
  value: T;
  label: string;
  className?: string;
}

export function RadioButton<T extends string>({
  value,
  label,
  className,
}: RadioButtonProps<T>) {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioButton must be used within a RadioGroup");
  }

  const { value: selectedValue, onChange } = context;
  const isSelected = value === selectedValue;

  return (
    <label className={`cursor-pointer ${className}`}>
      <div className="flex items-center gap-2">
        {/* 라디오 버튼 */}
        <div className="relative w-6 h-6">
          <div
            className={`w-6 h-6 rounded-full border-2 ${
              isSelected ? "border-black" : "border-[#777777]"
            }`}
          >
            {isSelected && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full" />
            )}
          </div>
        </div>

        {/* 라벨 */}
        <span className="text-lg font-medium text-[#333333]">{label}</span>
      </div>
      <input
        type="radio"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only" // 시각적으로 숨기기
      />
    </label>
  );
}
