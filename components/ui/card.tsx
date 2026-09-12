import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Card({
  title,
  description,
  children,
  className = "",
}: CardProps) {
  return (
    <section className={`ui-card ${className}`}>
      {title ? <h2 className="ui-card-title">{title}</h2> : null}

      {description ? (
        <p className="ui-card-description">{description}</p>
      ) : null}

      {children ? <div>{children}</div> : null}
    </section>
  );
}