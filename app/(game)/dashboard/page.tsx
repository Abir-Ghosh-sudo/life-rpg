export default function DashboardPage() {
  return (
    <section>
      <h1>Dashboard</h1>
      <p>Good evening, Hero. Your adventure is waiting.</p>

      <hr />

      <h2>Character Progress</h2>
      <p>Level: 4</p>
      <p>XP: 620 / 1000</p>
      <p>Gold: 250</p>
      <p>Daily Streak: 7 days</p>

      <hr />

      <h2>Today&apos;s Quests</h2>
      <ul>
        <li>
          Complete project work — Reward: 100 XP and 30 Gold
        </li>
        <li>
          Exercise for 30 minutes — Reward: 50 XP and 15 Gold
        </li>
        <li>
          Read for 20 minutes — Reward: 30 XP and 10 Gold
        </li>
      </ul>

      <a href="/quests">View all quests</a>

      <hr />

      <h2>Daily Boss</h2>
      <p>Boss: The Procrastination Dragon</p>
      <p>Health: 55 / 100</p>
      <p>Complete quests to defeat the boss.</p>

      <a href="/boss">Fight the boss</a>

      <hr />

      <h2>Latest Achievement</h2>
      <p>Early Bird — Complete a quest before 9 AM.</p>
      <a href="/achievements">View achievements</a>
    </section>
  );
}