"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type DropdownItem = {
  label: string;
  onClick?: () => void;
  danger?: boolean;
};

type DropdownProps = {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
};

export function Dropdown({
  trigger,
  items,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`ui-dropdown ${className}`}
    >
      <div
        className="ui-dropdown-trigger"
        onClick={() => setOpen((current) => !current)}
      >
        {trigger}
      </div>

      {open ? (
        <div className="ui-dropdown-menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`ui-dropdown-item ${
                item.danger ? "ui-dropdown-item-danger" : ""
              }`}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}