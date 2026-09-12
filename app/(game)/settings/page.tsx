export default function SettingsPage() {
  return (
    <section>
      <h1>Settings</h1>
      <p>Manage your Life RPG account preferences.</p>

      <hr />

      <h2>Profile</h2>
      <p>Name: Hero</p>
      <p>Email: hero@example.com</p>
      <button type="button">Edit profile</button>

      <hr />

      <h2>Notifications</h2>
      <p>Quest reminder: Enabled</p>
      <p>Daily boss reminder: Enabled</p>
      <button type="button">Manage notifications</button>

      <hr />

      <h2>Sound</h2>
      <p>Game sounds: Enabled</p>
      <button type="button">Change sound settings</button>

      <hr />

      <h2>Account</h2>
      <button type="button">Log out</button>
      <br />
      <br />
      <button type="button">Delete account</button>
    </section>
  );
}