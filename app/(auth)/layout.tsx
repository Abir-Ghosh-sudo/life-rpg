export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-container">
      {/* Ambient background orbs */}
      <div className="hero-orb hero-orb-1" style={{ width: "400px", height: "400px", top: "-50px", left: "-50px" }} />
      <div className="hero-orb hero-orb-2" style={{ width: "350px", height: "350px", bottom: "-50px", right: "-50px" }} />
      
      <div className="auth-card">
        {children}
      </div>
    </div>
  );
}