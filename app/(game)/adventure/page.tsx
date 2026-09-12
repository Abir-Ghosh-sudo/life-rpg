export default function AdventurePage() {
  return (
    <section>
      <h1>Adventure</h1>
      <p>Explore new worlds by completing real-life quests.</p>

      <hr />

      <h2>Your World Map</h2>

      <article>
        <h3>Starter Village</h3>
        <p>Status: Unlocked</p>
        <p>Your journey began here.</p>
        <button type="button">Explore Village</button>
      </article>

      <hr />

      <article>
        <h3>Forest of Focus</h3>
        <p>Status: Unlocked</p>
        <p>Unlock condition: Complete 10 focus quests.</p>
        <button type="button">Explore Forest</button>
      </article>

      <hr />

      <article>
        <h3>Discipline Dungeon</h3>
        <p>Status: Locked</p>
        <p>Unlock condition: Reach Level 10.</p>
        <button type="button">Locked</button>
      </article>

      <hr />

      <article>
        <h3>Dragon Realm</h3>
        <p>Status: Locked</p>
        <p>Unlock condition: Defeat 5 daily bosses.</p>
        <button type="button">Locked</button>
      </article>
    </section>
  );
}