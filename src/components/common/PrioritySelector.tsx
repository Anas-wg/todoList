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
    switch (priorityValue) {
      case "urgent":
        return "bg-priority-urgent hover:bg-pink-300 text-priority-urgent-text";
      case "high":
        return "bg-priority-high hover:bg-orange-300 text-priority-high-text";
      case "medium":
        return "bg-priority-med hover:bg-blue-300 text-priority-med-text";
      case "low":
        return "bg-priority-low hover:bg-gray-300 text-priority-low-text";
      default:
        return "bg-priority-low hover:bg-gray-300 text-priority-low-text";
    }
  };

  const getSelectedColor = (priorityValue: string) => {
    switch (priorityValue) {
      case "urgent":
        return "bg-pink-300 ring-2 ring-pink-200 text-priority-urgent-text";
      case "high":
        return "bg-orange-300 ring-2 ring-orange-200 text-priority-high-text";
      case "medium":
        return "bg-blue-300 ring-2 ring-blue-200 text-priority-med-text";
      case "low":
        return "bg-gray-300 ring-2 ring-gray-200 text-priority-low-text";
      default:
        return "bg-gray-300 ring-2 ring-gray-200 text-priority-low-text";
    }
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
