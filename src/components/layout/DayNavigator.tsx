import DayHeader from "./DayHeader";

interface DayNavigatorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

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
