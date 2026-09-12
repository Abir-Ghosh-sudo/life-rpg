"use client";

import { useState } from "react";
import Link from "next/link";

type UserMenuProps = {
  name?: string;
  email?: string;
  avatarFallback?: string;
};

export function UserMenu({
  name = "Player",
  email = "player@liferpg.com",
  avatarFallback = "P",
}: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="user-menu">
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Open user menu"
      >
        <span className="user-menu-avatar">
          {avatarFallback}
        </span>

        <span className="user-menu-name">
          {name}
        </span>

        <span
          className={`user-menu-arrow ${
            open ? "user-menu-arrow-open" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open ? (
        <div className="user-menu-dropdown">
          <div className="user-menu-info">
            <span className="user-menu-info-name">
              {name}
            </span>

            <span className="user-menu-email">
              {email}
            </span>
          </div>

          <div className="user-menu-divider" />

          <Link
            href="/character"
            className="user-menu-link"
            onClick={() => setOpen(false)}
          >
            Character
          </Link>

          <Link
            href="/settings"
            className="user-menu-link"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>

          <button
            type="button"
            className="user-menu-logout"
            onClick={() => setOpen(false)}
          >
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
}