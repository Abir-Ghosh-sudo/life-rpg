export default function BossPage() {
  return (
    <section>
      <h1>Daily Boss</h1>
      <p>Complete quests to damage today&apos;s boss.</p>

      <hr />

      <h2>The Procrastination Dragon</h2>
      <p>Boss Level: 5</p>
      <p>Health: 55 / 100</p>
      <p>Time remaining: Today ends at midnight.</p>

      <hr />

      <h2>How to fight</h2>
      <p>Every completed quest deals damage to the boss.</p>
      <p>Complete a hard quest to deal extra damage.</p>

      <hr />

      <h2>Boss Rewards</h2>
      <ul>
        <li>300 XP</li>
        <li>100 Gold</li>
        <li>Dragon Slayer achievement</li>
      </ul>

      <p>
        <a href="/quests">Go to quests and fight</a>
      </p>
    </section>
  );
}