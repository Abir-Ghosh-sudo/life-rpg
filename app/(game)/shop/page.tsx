export default function ShopPage() {
  return (
    <section>
      <h1>Shop</h1>
      <p>Use your Gold to unlock useful items.</p>

      <p>Your Gold: 250</p>

      <hr />

      <h2>Available Items</h2>

      <article>
        <h3>Focus Potion</h3>
        <p>Restores 20 Energy.</p>
        <p>Price: 50 Gold</p>
        <button type="button">Buy item</button>
      </article>

      <hr />

      <article>
        <h3>Consistency Shield</h3>
        <p>A reward for keeping your daily streak alive.</p>
        <p>Price: 150 Gold</p>
        <button type="button">Buy item</button>
      </article>

      <hr />

      <article>
        <h3>Golden Hourglass</h3>
        <p>Special focus-mode accessory.</p>
        <p>Price: 200 Gold</p>
        <button type="button">Buy item</button>
      </article>

      <p>
        <a href="/inventory">View inventory</a>
      </p>
    </section>
  );
}