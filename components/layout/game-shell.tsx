import type { ReactNode } from "react";

type GameShellProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  topbar?: ReactNode;
  className?: string;
};

export function GameShell({
  children,
  sidebar,
  topbar,
  className = "",
}: GameShellProps) {
  return (
    <div className={`game-shell ${className}`}>
      {sidebar ? (
        <aside className="game-shell-sidebar">
          {sidebar}
        </aside>
      ) : null}

      <div className="game-shell-main">
        {topbar ? (
          <header className="game-shell-topbar">
            {topbar}
          </header>
        ) : null}

        <main className="game-shell-content">
          {children}
        </main>
      </div>
    </div>
  );
}