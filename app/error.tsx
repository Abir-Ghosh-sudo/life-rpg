"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>We could not load this part of your adventure.</p>

      <button type="button" onClick={() => reset()}>
        Try again
      </button>

      <p>
        <a href="/dashboard">Return to dashboard</a>
      </p>
    </main>
  );
}