import React from "react";

interface CalendarIconProps {
  className?: string;
}

const CalendarIcon = ({ className = "w-5 h-5" }: CalendarIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M6.75 2.25a.75.75 0 0 1 .75.75V4.5h9V3a.75.75 0 0 1 1.5 0V4.5h.75A2.25 2.25 0 0 1 21.75 6.75v12A2.25 2.25 0 0 1 19.5 21H4.5a2.25 2.25 0 0 1-2.25-2.25v-12A2.25 2.25 0 0 1 4.5 4.5h.75V3a.75.75 0 0 1 1.5 0V4.5Zm-3 6.75v9A.75.75 0 0 0 4.5 18.75h15a.75.75 0 0 0 .75-.75v-9H3.75Z"
      clipRule="evenodd"
    />
  </svg>
);

export default CalendarIcon;
