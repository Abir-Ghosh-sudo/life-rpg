export default function ForgotPasswordPage() {
  return (
    <main>
      <h1>Forgot your password?</h1>
      <p>Enter your email and we will send you a reset link.</p>

      <form>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <br />

        <button type="submit">Send reset link</button>
      </form>

      <p>
        <a href="/login">Back to log in</a>
      </p>
    </main>
  );
}