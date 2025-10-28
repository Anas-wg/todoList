import { PRIORITY_COLOR_CLASSES, PRIORITY_LEVELS } from "../../utils/constants";

interface PriorityOption {
  value: string;
  label: string;
  color?: string;
}

interface PrioritySelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: PriorityOption[];
  className?: string;
}

const PrioritySelector = ({
  value,
  onChange,
  options,
  className = "",
}: PrioritySelectorProps) => {
  const getPriorityColor = (priorityValue: string) => {
    const priorityKey = priorityValue as keyof typeof PRIORITY_COLOR_CLASSES;
    return (
      PRIORITY_COLOR_CLASSES[priorityKey]?.base ||
      PRIORITY_COLOR_CLASSES[PRIORITY_LEVELS.LOW].base
    );
  };

  const getSelectedColor = (priorityValue: string) => {
    const priorityKey = priorityValue as keyof typeof PRIORITY_COLOR_CLASSES;
    return (
      PRIORITY_COLOR_CLASSES[priorityKey]?.selected ||
      PRIORITY_COLOR_CLASSES[PRIORITY_LEVELS.LOW].selected
    );
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => {
        const isSelected = value === option.value;
        const baseClasses =
          "px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap";
        const colorClasses = isSelected
          ? getSelectedColor(option.value)
          : getPriorityColor(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`${baseClasses} ${colorClasses}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default PrioritySelector;
