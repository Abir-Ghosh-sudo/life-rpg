export default function InventoryPage() {
  return (
    <section>
      <h1>Inventory</h1>
      <p>Manage the items you have earned or purchased.</p>

      <hr />

      <h2>Equipped Items</h2>
      <ul>
        <li>Weapon: Focus Sword</li>
        <li>Armor: Consistency Shield</li>
        <li>Accessory: Golden Hourglass</li>
      </ul>

      <hr />

      <h2>Owned Items</h2>

      <article>
        <h3>Focus Potion</h3>
        <p>Restores 20 Energy.</p>
        <button type="button">Use item</button>
      </article>

      <hr />

      <article>
        <h3>Starter Sword</h3>
        <p>Your first quest weapon.</p>
        <button type="button">Equip item</button>
      </article>

      <hr />

      <article>
        <h3>Consistency Shield</h3>
        <p>Helps represent your daily streak.</p>
        <button type="button">Unequip item</button>
      </article>

      <p>
        <a href="/shop">Go to shop</a>
      </p>
    </section>
  );
}