"use client";

import type { InputHTMLAttributes } from "react";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
};

export function Checkbox({
  label,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id ?? `checkbox-${label ?? "item"}`;

  return (
    <label
      htmlFor={checkboxId}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        color: "var(--text)",
        fontWeight: 600,
      }}
    >
      <input
        id={checkboxId}
        type="checkbox"
        className={className}
        style={{
          width: "18px",
          height: "18px",
          accentColor: "var(--indigo)",
          cursor: "pointer",
        }}
        {...props}
      />

      {label ? <span>{label}</span> : null}
    </label>
  );
}