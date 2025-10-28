interface DayHeaderProps {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
}

const weekday = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

function formatLongDate(d: Date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[d.getMonth()]} ${d.getDate()}th`;
}

const DayHeader = ({ date, onPrev, onNext }: DayHeaderProps) => {
  return (
    <nav
      className="flex items-center justify-between px-2 py-3"
      role="navigation"
      aria-label="날짜 선택"
    >
      <button
        type="button"
        aria-label="previous day"
        className="text-gray-400 hover:text-gray-600 px-2 prev-btn"
        onClick={onPrev}
      >
        ◀
      </button>
      <div className="text-center date-text">
        <div
          className="text-sm tracking-wide font-semibold text-gray-500"
          aria-label="weekday text"
        >
          {weekday[date.getDay()]}
        </div>
        <div className="text-xs text-gray-400" aria-label="date text">
          {formatLongDate(date)}
        </div>
      </div>
      <button
        type="button"
        aria-label="next day"
        className="text-gray-400 hover:text-gray-600 px-2"
        onClick={onNext}
      >
        ▶
      </button>
    </nav>
  );
};

export default DayHeader;
