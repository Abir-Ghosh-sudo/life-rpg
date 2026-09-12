export default function ResetPasswordPage() {
  return (
    <div>
      <div className="auth-header">
        <div className="auth-logo">✨</div>
        <h1 className="auth-title">New Key</h1>
        <p className="auth-subtitle">Forge a strong new password for your account</p>
      </div>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            name="new-password"
            type="password"
            required
            className="form-input"
            placeholder="At least 8 characters"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirm-password">Confirm New Password</label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            className="form-input"
            placeholder="Repeat your new password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full" style={{ marginTop: "8px", padding: "13px" }}>
          🛡️ Reset Password
        </button>
      </form>

      <div className="auth-footer" style={{ marginTop: "24px" }}>
        <a href="/login" style={{ fontWeight: 700, color: "var(--violet-light)" }}>
          ← Back to Login
        </a>
      </div>
    </div>
  );
}