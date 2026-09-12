"use client";

export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="auth-header">
        <div className="auth-logo">🔑</div>
        <h1 className="auth-title">Recover Spell</h1>
        <p className="auth-subtitle">Enter your email and we will send a password reset spell</p>
      </div>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Registered Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="form-input"
            placeholder="hero@realm.com"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full" style={{ marginTop: "8px", padding: "13px" }}>
          📬 Send Reset Link
        </button>
      </form>

      <div className="auth-footer" style={{ marginTop: "24px" }}>
        Remembered your secret?{" "}
        <a href="/login" style={{ fontWeight: 700, color: "var(--violet-light)" }}>
          Back to Login
        </a>
      </div>
    </div>
  );
}