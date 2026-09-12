export default function QuestsPage() {
  return (
    <section>
      <h1>Quests</h1>
      <p>Complete real-life tasks to earn XP and Gold.</p>

      <p>
        <a href="/quests/new">Create a new quest</a>
      </p>

      <hr />

      <h2>Active Quests</h2>

      <article>
        <h3>Complete project work</h3>
        <p>Difficulty: Hard</p>
        <p>Reward: 100 XP and 30 Gold</p>
        <p>Status: Active</p>
        <a href="/quests/1">View quest</a>
      </article>

      <hr />

      <article>
        <h3>Exercise for 30 minutes</h3>
        <p>Difficulty: Medium</p>
        <p>Reward: 50 XP and 15 Gold</p>
        <p>Status: Active</p>
        <a href="/quests/2">View quest</a>
      </article>

      <hr />

      <article>
        <h3>Read for 20 minutes</h3>
        <p>Difficulty: Easy</p>
        <p>Reward: 30 XP and 10 Gold</p>
        <p>Status: Active</p>
        <a href="/quests/3">View quest</a>
      </article>

      <hr />

      <h2>Completed Quests</h2>
      <p>No completed quests yet.</p>
    </section>
  );
}