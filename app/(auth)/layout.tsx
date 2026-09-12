export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header>
        <h1>Life RPG</h1>
        <p>Your real-life adventure begins here.</p>
      </header>

      <hr />

      {children}
    </section>
  );
}