"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItem = {
  label: string;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Quests", href: "/quests" },
  { label: "Character", href: "/character" },
  { label: "Adventure", href: "/adventure" },
  { label: "Boss", href: "/boss" },
  { label: "Shop", href: "/shop" },
  { label: "Inventory", href: "/inventory" },
  { label: "Achievements", href: "/achievements" },
  { label: "Skill Tree", href: "/skill-tree" },
  { label: "Focus", href: "/focus" },
  { label: "History", href: "/history" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>Life RPG</h1>
        <p>Your real-life adventure</p>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${
                isActive ? "sidebar-link-active" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}