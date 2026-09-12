"use client";

import { useState } from "react";
import Link from "next/link";

type TopbarProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function Topbar({
  title = "Life RPG",
  subtitle,
  children,
}: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div>
          <h1 className="topbar-title">{title}</h1>

          {subtitle ? (
            <p className="topbar-subtitle">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="topbar-right">
        {children}

        <button
          type="button"
          className="topbar-icon-button"
          onClick={() => setShowNotifications((value) => !value)}
          aria-label="Notifications"
        >
          🔔
        </button>

        {showNotifications ? (
          <div className="topbar-notification-panel">
            <strong>Notifications</strong>
            <p>No new notifications right now.</p>
          </div>
        ) : null}

        <Link
          href="/settings"
          className="topbar-profile-link"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}