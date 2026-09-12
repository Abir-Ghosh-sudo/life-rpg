"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNavItems = [
  { label: "Home", href: "/dashboard", icon: "🏠" },
  { label: "Quests", href: "/quests", icon: "⚔️" },
  { label: "Focus", href: "/focus", icon: "🎯" },
  { label: "Character", href: "/character", icon: "🧙" },
  { label: "More", href: "/settings", icon: "☰" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-link ${
              isActive ? "mobile-nav-link-active" : ""
            }`}
          >
            <span className="mobile-nav-icon" aria-hidden="true">
              {item.icon}
            </span>

            <span className="mobile-nav-label">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}