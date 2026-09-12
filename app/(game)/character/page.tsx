export default function CharacterPage() {
  return (
    <section>
      <h1>Character</h1>
      <p>Build your real-life hero.</p>

      <hr />

      <h2>Hero Profile</h2>
      <p>Name: Hero</p>
      <p>Class: Pathfinder</p>
      <p>Level: 4</p>
      <p>Title: Quest Seeker</p>

      <hr />

      <h2>Progress</h2>
      <p>XP: 620 / 1000</p>
      <p>Gold: 250</p>
      <p>Energy: 80 / 100</p>

      <hr />

      <h2>Attributes</h2>
      <ul>
        <li>Strength: 12</li>
        <li>Focus: 15</li>
        <li>Creativity: 10</li>
        <li>Discipline: 14</li>
        <li>Health: 11</li>
      </ul>

      <hr />

      <h2>Equipped Items</h2>
      <ul>
        <li>Weapon: Focus Sword</li>
        <li>Armor: Consistency Shield</li>
        <li>Accessory: Golden Hourglass</li>
      </ul>

      <p>
        <a href="/inventory">View inventory</a>
      </p>
    </section>
  );
}