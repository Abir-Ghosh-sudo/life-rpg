export default function FocusPage() {
  return (
    <section>
      <h1>Focus Mode</h1>
      <p>Start a focused session and earn XP.</p>

      <hr />

      <h2>Focus Timer</h2>
      <p>25:00</p>

      <button type="button">Start session</button>
      <button type="button">Pause</button>
      <button type="button">Stop</button>

      <hr />

      <h2>Session Goal</h2>
      <p>Focus for 25 minutes.</p>
      <p>Reward: 25 XP and 5 Gold</p>

      <hr />

      <h2>Today&apos;s Focus Sessions</h2>
      <p>Completed sessions: 2</p>
      <p>Total focus time: 50 minutes</p>

      <p>
        <a href="/history">View focus history</a>
      </p>
    </section>
  );
}