import React from "react";

interface WarningIconProps {
  className?: string;
}

const WarningIcon = ({ className = "h-6 w-6" }: WarningIconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.945 3.35h13.71c1.771 0 2.816-1.85 1.945-3.35L13.71 7.108c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

export default WarningIcon;
