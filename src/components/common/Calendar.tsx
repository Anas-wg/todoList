import { useMemo, useState } from "react";

export interface CalendarProps {
  value?: Date | null;
  onChange?: (day: Date | null) => void;
  showAdjacentMonths?: boolean; // 이전/다음 달 날짜 표시
  className?: string;
}

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"] as const;

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isSameDay(a?: Date | null, b?: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Calendar({
  value = null,
  onChange,
  showAdjacentMonths = true,
  className = "",
}: CalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [currentMonth, setCurrentMonth] = useState<Date>(today);

  const calendarDays = useMemo(() => {
    const startWeekday = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    const prevMonthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    );

    const nextMonthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );

    const days: Date[] = Array.from({ length: startWeekday }, (_, i) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthEnd.getDate() - i
      );
    }).reverse();

    days.push(
      ...Array.from(
        { length: endOfMonth.getDate() },
        (_, i) =>
          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
      )
    );

    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      days.push(
        ...Array.from(
          { length: remaining },
          (_, i) =>
            new Date(
              nextMonthStart.getFullYear(),
              nextMonthStart.getMonth(),
              i + 1
            )
        )
      );
    }

    return days;
  }, [currentMonth]);

  const weeks = useMemo(() => {
    const rows: Date[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      rows.push(calendarDays.slice(i, i + 7));
    }
    return rows;
  }, [calendarDays]);

  const handlePrev = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNext = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleSelect = (day: Date) => {
    const selected = startOfDay(day);
    if (onChange) onChange(selected);
  };

  const isInCurrentMonth = (d: Date) =>
    d.getMonth() === currentMonth.getMonth();

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={handlePrev}
          className="px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 touch-manipulation"
          aria-label="이전 달"
        >
          &lt;
        </button>
        <div className="text-base font-semibold text-gray-900 px-2">
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 touch-manipulation"
          aria-label="다음 달"
        >
          &gt;
        </button>
      </div>

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            {daysOfWeek.map((d) => (
              <th
                key={d}
                className="p-1 sm:p-2 text-xs font-medium text-gray-500 text-center"
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((row, i) => (
            <tr key={i}>
              {row.map((day, j) => {
                const inCurrent = isInCurrentMonth(day);
                const muted = !inCurrent;
                const selected = isSameDay(value, day);
                const isPast = startOfDay(day) < today && !selected;

                const base =
                  "w-full py-2 sm:py-3 inline-flex items-center justify-center rounded-full cursor-pointer select-none touch-manipulation min-h-[2.5rem] sm:min-h-[2.75rem]";
                const color = selected
                  ? "bg-brand text-fg"
                  : isPast
                  ? "text-gray-300"
                  : muted && !showAdjacentMonths
                  ? "text-transparent"
                  : muted
                  ? "text-gray-400"
                  : "text-gray-900 hover:bg-gray-100 active:bg-gray-200";

                return (
                  <td key={j} className="p-0.5 sm:p-1 text-center">
                    <button
                      type="button"
                      className={`${base} ${color}`}
                      onClick={() => handleSelect(day)}
                      disabled={isPast}
                    >
                      {day.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
