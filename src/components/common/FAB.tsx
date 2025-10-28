import React from "react";

interface FABProps {
  onClick: () => void;
  hidden?: boolean;
}

const FAB = ({ onClick, hidden }: FABProps) => {
  if (hidden) return null;
  return (
    <button
      type="button"
      aria-label="할 일 추가"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand text-fg shadow-lg flex items-center justify-center text-3xl"
      onClick={onClick}
    >
      +
    </button>
  );
};

export default FAB;
