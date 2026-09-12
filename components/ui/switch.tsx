"use client";

import { useId } from "react";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  className = "",
}: SwitchProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        style={{
          width: "42px",
          height: "22px",
          accentColor: "var(--indigo)",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      />

      {label ? (
        <span
          className={className}
          style={{
            color: "var(--text)",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
}