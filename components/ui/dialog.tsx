"use client";

import type { ReactNode } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  className = "",
}: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="ui-dialog-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`ui-dialog ${className}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
      >
        <div className="ui-dialog-header">
          {title ? (
            <h2 id="dialog-title" className="ui-dialog-title">
              {title}
            </h2>
          ) : (
            <span />
          )}

          <button
            type="button"
            className="ui-dialog-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <div className="ui-dialog-content">{children}</div>
      </div>
    </div>
  );
}