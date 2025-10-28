import React, { useMemo, useState } from "react";
import PrioritySelector from "./PrioritySelector";
import Calendar from "./Calendar";

interface InputFieldProps {
  id: string;
  name: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "date"
    | "number"
    | "textarea"
    | "select";
  value: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  rows?: number;
  options?: { value: string; label: string; color?: string }[];
}

const InputField = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  className = "",
  rows,
  options,
}: InputFieldProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const parsedDate: Date | null = useMemo(() => {
    if (!value) return null;
    // expecting YYYY-MM-DD
    const matchExec = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!matchExec) return null;
    const year = Number(matchExec[1]);
    const monthNumber = Number(matchExec[2]);
    const dayNumber = Number(matchExec[3]);
    const dateCandidate = new Date(year, monthNumber - 1, dayNumber);
    return dateCandidate.getFullYear() === year &&
      dateCandidate.getMonth() === monthNumber - 1 &&
      dateCandidate.getDate() === dayNumber
      ? dateCandidate
      : null;
  }, [value]);
  const baseInputClasses = `w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 ${
    error ? "border-red-500" : "border-gray-300"
  } focus:border-brand focus:outline-none focus:ring-0 transition-colors duration-200`;

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows || 3}
          className={`${baseInputClasses} resize-none ${className}`}
        />
      );
    }

    if (type === "select" && options) {
      return (
        <PrioritySelector
          value={value}
          onChange={(newValue) => {
            const syntheticEvent = {
              target: { name, value: newValue },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange(syntheticEvent);
          }}
          options={
            options as { value: string; label: string; color?: string }[]
          }
          className={className}
        />
      );
    }

    return (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${baseInputClasses} ${className}`}
      />
    );
  };

  return (
    <div className={`mb-4 relative overflow-visible ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {type === "date" ? (
        <div className="relative">
          <input
            id={id}
            name={name}
            type="text"
            inputMode="numeric"
            placeholder={placeholder || "YYYY-MM-DD"}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              e.currentTarget.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }}
            className={`${baseInputClasses} pr-10`}
            required={required}
          />
          <button
            type="button"
            aria-label="달력 열기"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 px-2"
            onClick={() => setIsCalendarOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25a.75.75 0 0 1 .75.75V4.5h9V3a.75.75 0 0 1 1.5 0V4.5h.75A2.25 2.25 0 0 1 21.75 6.75v12A2.25 2.25 0 0 1 19.5 21H4.5a2.25 2.25 0 0 1-2.25-2.25v-12A2.25 2.25 0 0 1 4.5 4.5h.75V3a.75.75 0 0 1 1.5 0V4.5Zm-3 6.75v9A.75.75 0 0 0 4.5 18.75h15a.75.75 0 0 0 .75-.75v-9H3.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isCalendarOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 sm:absolute sm:inset-auto sm:mt-2 sm:p-3 sm:bg-white sm:rounded-lg sm:shadow-xl sm:border sm:border-border sm:w-[20rem]">
              <div className="w-full max-w-sm bg-white rounded-lg shadow-xl border border-border p-3 sm:max-w-none sm:w-full">
                <Calendar
                  value={parsedDate}
                  onChange={(day) => {
                    if (!day) {
                      const syntheticEvent = {
                        target: { name, value: "" },
                      } as unknown as React.ChangeEvent<HTMLInputElement>;
                      onChange(syntheticEvent);
                      setIsCalendarOpen(false);
                      return;
                    }
                    const year = day.getFullYear();
                    const monthString = String(day.getMonth() + 1).padStart(
                      2,
                      "0"
                    );
                    const dayString = String(day.getDate()).padStart(2, "0");
                    const nextValue = `${year}-${monthString}-${dayString}`;
                    const syntheticEvent = {
                      target: { name, value: nextValue },
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    onChange(syntheticEvent);
                    setIsCalendarOpen(false);
                  }}
                  showAdjacentMonths
                />
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(false)}
                  className="w-full mt-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 sm:hidden"
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        renderInput()
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
