"use client";

import type { InputHTMLAttributes } from "react";

type SliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  valueLabel?: string | number;
  className?: string;
};

export function Slider({
  label,
  valueLabel,
  className = "",
  ...props
}: SliderProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
      }}
    >
      {label ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span className="ui-label">{label}</span>

          {valueLabel !== undefined ? (
            <span
              style={{
                color: "var(--indigo)",
                fontWeight: 700,
              }}
            >
              {valueLabel}
            </span>
          ) : null}
        </div>
      ) : null}

      <input
        type="range"
        style={{
          width: "100%",
          accentColor: "var(--indigo)",
          cursor: "pointer",
        }}
        {...props}
      />
    </div>
  );
}