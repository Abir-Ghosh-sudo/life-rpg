import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "reward"
  | "success"
  | "danger";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`ui-badge ui-badge-${variant} ${className}`}
    >
      {children}
    </span>
  );
}