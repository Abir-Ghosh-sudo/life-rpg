import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

export function Select({
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      className={`ui-select ${className}`}
      {...props}
    />
  );
}