import React from "react";

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

const PriorityBadge = ({ priority, className = "" }: PriorityBadgeProps) => {
  const getPriorityColor = (priorityValue: string) => {
    switch (priorityValue) {
      case "urgent":
        return "bg-priority-urgent text-priority-urgent-text";
      case "high":
        return "bg-priority-high text-priority-high-text";
      case "medium":
        return "bg-priority-med text-priority-med-text";
      case "low":
        return "bg-priority-low text-priority-low-text";
      default:
        return "bg-priority-low text-priority-low-text";
    }
  };

  const getPriorityLabel = (priorityValue: string) => {
    switch (priorityValue) {
      case "urgent":
        return "Urgent";
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return priorityValue;
    }
  };

  const colorClasses = getPriorityColor(priority);
  const label = getPriorityLabel(priority);

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClasses} ${className}`}
    >
      {label}
    </span>
  );
};

export default PriorityBadge;
