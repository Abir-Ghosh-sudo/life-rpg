export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1>Life RPG</h1>
        <p>Your real-life adventure</p>
      </header>

      <nav>
        <a href="/dashboard">Dashboard</a>{" | "}
        <a href="/quests">Quests</a>{" | "}
        <a href="/character">Character</a>{" | "}
        <a href="/adventure">Adventure</a>{" | "}
        <a href="/boss">Boss</a>{" | "}
        <a href="/shop">Shop</a>{" | "}
        <a href="/inventory">Inventory</a>{" | "}
        <a href="/achievements">Achievements</a>{" | "}
        <a href="/skill-tree">Skill Tree</a>{" | "}
        <a href="/focus">Focus</a>{" | "}
        <a href="/history">History</a>{" | "}
        <a href="/analytics">Analytics</a>{" | "}
        <a href="/settings">Settings</a>
      </nav>

      <hr />

      <main>{children}</main>
    </div>
  );
}