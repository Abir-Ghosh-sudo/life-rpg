import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`page-header ${className}`}>
      <div className="page-header-content">
        <h1 className="page-header-title">{title}</h1>

        {description ? (
          <p className="page-header-description">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="page-header-actions">
          {actions}
        </div>
      ) : null}
    </div>
  );
}