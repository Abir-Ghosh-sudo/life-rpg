export default function QuestDetailsPage() {
  return (
    <section>
      <h1>Quest Details</h1>

      <h2>Complete project work</h2>
      <p>Finish your assigned project tasks before the deadline.</p>

      <hr />

      <p>Category: Work</p>
      <p>Difficulty: Hard</p>
      <p>Reward: 100 XP and 30 Gold</p>
      <p>Status: Active</p>

      <hr />

      <button type="button">Complete Quest</button>

      <p>
        <a href="/quests">Back to quests</a>
      </p>
    </section>
  );
}