import { useState } from "react";
import Calendar from "../Calendar";
import { useDateParsing } from "../../../hooks/useDateParsing";
import CalendarIcon from "../icons/CalendarIcon";

interface DateInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
  disabled?: boolean;
}

const DateInput = ({
  id,
  name,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  required = false,
  className = "",
  error,
  disabled = false,
}: DateInputProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const parsedDate = useDateParsing(value);

  const baseInputClasses = `w-full px-0 py-2 bg-transparent border-0 border-b-2 ${
    error ? "border-red-500" : "border-gray-300"
  } focus:border-brand focus:outline-none focus:ring-0 transition-colors duration-200 ${
    disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"
  }`;

  const handleDateSelect = (day: Date | null) => {
    if (!day) {
      const syntheticEvent = {
        target: { name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
      setIsCalendarOpen(false);
      return;
    }

    const year = day.getFullYear();
    const monthString = String(day.getMonth() + 1).padStart(2, "0");
    const dayString = String(day.getDate()).padStart(2, "0");
    const nextValue = `${year}-${monthString}-${dayString}`;

    const syntheticEvent = {
      target: { name, value: nextValue },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
    setIsCalendarOpen(false);
  };

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          e.currentTarget.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }}
        className={`${baseInputClasses} pr-10 ${className}`}
        required={required}
        disabled={disabled}
      />

      <button
        type="button"
        aria-label="달력 열기"
        className={`absolute right-0 top-1/2 -translate-y-1/2 px-2 ${
          disabled
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => !disabled && setIsCalendarOpen((v) => !v)}
        disabled={disabled}
      >
        <CalendarIcon className="w-5 h-5" />
      </button>

      {isCalendarOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 sm:absolute sm:inset-auto sm:mt-2 sm:p-3 sm:bg-white sm:rounded-lg sm:shadow-xl sm:border sm:border-border sm:w-[20rem]"
          role="dialog"
          aria-modal="true"
          aria-label="달력"
        >
          <div className="w-full max-w-sm bg-white rounded-lg shadow-xl border border-border p-3 sm:max-w-none sm:w-full">
            <Calendar
              value={parsedDate}
              onChange={handleDateSelect}
              showAdjacentMonths
            />
            <button
              type="button"
              onClick={() => setIsCalendarOpen(false)}
              aria-label="달력 닫기"
              className="w-full mt-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 sm:hidden"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput;
