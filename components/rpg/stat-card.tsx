import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  change?: string;
  accent?: "indigo" | "violet" | "gold" | "emerald" | "rose";
};

export function StatCard({
  label,
  value,
  icon,
  change,
  accent = "indigo",
}: StatCardProps) {
  return (
    <div className={`stat-card stat-card-${accent}`}>
      <div className="stat-card-top">
        <span className="stat-card-label">
          {label}
        </span>

        {icon ? (
          <div className="stat-card-icon">
            {icon}
          </div>
        ) : null}
      </div>

      <div className="stat-card-value">
        {value}
      </div>

      {change ? (
        <div className="stat-card-change">
          {change}
        </div>
      ) : null}
    </div>
  );
}