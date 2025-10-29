import DayHeader from "./DayHeader";

// 상단 날짜 이동 로직 컴포넌트
interface DayNavigatorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

// 상단 날짜 이동 로직 컴포넌트
const DayNavigator = ({ date, onDateChange }: DayNavigatorProps) => {
  const handlePrev = () => {
    const prevDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );
    onDateChange(prevDate);
  };

  const handleNext = () => {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    onDateChange(nextDate);
  };

  return <DayHeader date={date} onPrev={handlePrev} onNext={handleNext} />;
};

export default DayNavigator;
