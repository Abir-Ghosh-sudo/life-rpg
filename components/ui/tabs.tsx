"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
};

export function Tabs({
  items,
  defaultTab,
  className = "",
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab ?? items[0]?.id ?? ""
  );

  const activeItem = items.find(
    (item) => item.id === activeTab
  );

  return (
    <div className={`ui-tabs ${className}`}>
      <div className="ui-tabs-list" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeTab === item.id}
            className={`ui-tabs-trigger ${
              activeTab === item.id
                ? "ui-tabs-trigger-active"
                : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="ui-tabs-content">
        {activeItem?.content}
      </div>
    </div>
  );
}