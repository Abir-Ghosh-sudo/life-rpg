export default function HistoryPage() {
  return (
    <section>
      <h1>Activity History</h1>
      <p>See everything you have completed on your journey.</p>

      <hr />

      <h2>Today</h2>

      <article>
        <h3>Focus session completed</h3>
        <p>Duration: 25 minutes</p>
        <p>Reward: 25 XP and 5 Gold</p>
      </article>

      <hr />

      <article>
        <h3>Quest completed: Morning exercise</h3>
        <p>Reward: 50 XP and 15 Gold</p>
      </article>

      <hr />

      <h2>Yesterday</h2>

      <article>
        <h3>Quest completed: Read for 20 minutes</h3>
        <p>Reward: 30 XP and 10 Gold</p>
      </article>

      <hr />

      <article>
        <h3>Achievement unlocked: Early Bird</h3>
        <p>Complete a quest before 9 AM.</p>
      </article>
    </section>
  );
}