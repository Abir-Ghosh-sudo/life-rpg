"use client";

import {
  useState,
  type ReactNode,
} from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Tooltip({
  content,
  children,
  className = "",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={`ui-tooltip ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span
          className="ui-tooltip-content"
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}