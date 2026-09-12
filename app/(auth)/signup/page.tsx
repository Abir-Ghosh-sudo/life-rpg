export default function SignupPage() {
  return (
    <main>
      <h1>Create your Life RPG account</h1>
      <p>Start your journey and level up your real life.</p>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <br />

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
            placeholder="Create a password"
          />
        </div>

        <br />

        <button type="submit">Create account</button>
      </form>

      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </main>
  );
}