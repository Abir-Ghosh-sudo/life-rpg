export default function ResetPasswordPage() {
  return (
    <main>
      <h1>Reset your password</h1>
      <p>Create a new password for your Life RPG account.</p>

      <form>
        <div>
          <label htmlFor="new-password">New password</label>
          <br />
          <input
            id="new-password"
            name="new-password"
            type="password"
            placeholder="Enter a new password"
          />
        </div>

        <br />

        <div>
          <label htmlFor="confirm-password">Confirm password</label>
          <br />
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="Enter the password again"
          />
        </div>

        <br />

        <button type="submit">Reset password</button>
      </form>

      <p>
        <a href="/login">Back to log in</a>
      </p>
    </main>
  );
}