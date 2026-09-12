declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

export default function LoginPage() {
  return (
    <main>
      <h1>Log in to Life RPG</h1>
      <p>Continue your adventure.</p>

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

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <br />

        <button type="submit">Log in</button>
      </form>

      <p>
        <a href="/forgot-password">Forgot password?</a>
      </p>

      <p>
        New to Life RPG? <a href="/signup">Create an account</a>
      </p>
    </main>
  );
}