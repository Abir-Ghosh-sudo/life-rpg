export default function SkillTreePage() {
  return (
    <section>
      <h1>Skill Tree</h1>
      <p>Unlock skills as you level up.</p>

      <p>Available Skill Points: 2</p>

      <hr />

      <h2>Focus Skills</h2>

      <article>
        <h3>Deep Focus</h3>
        <p>Earn extra XP from focus sessions.</p>
        <p>Status: Unlocked</p>
      </article>

      <hr />

      <article>
        <h3>Time Mastery</h3>
        <p>Unlock at Level 6.</p>
        <button type="button">Locked</button>
      </article>

      <hr />

      <h2>Discipline Skills</h2>

      <article>
        <h3>Streak Keeper</h3>
        <p>Get bonus Gold for daily streaks.</p>
        <button type="button">Unlock skill</button>
      </article>

      <hr />

      <article>
        <h3>Quest Champion</h3>
        <p>Complete 50 quests to unlock.</p>
        <button type="button">Locked</button>
      </article>
    </section>
  );
}