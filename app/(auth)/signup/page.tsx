"use client";

import { useState } from "react";
import { useGameState } from "@/lib/game/game-context";
import { signupAction } from "@/features/auth/actions";

export default function SignupPage() {
  const { loginUser } = useGameState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const result = await signupAction({ name, email, password }).catch(() => null);

      if (result && !result.success && result.message) {
        setErrorMsg(result.message);
        setLoading(false);
        return;
      }

      loginUser(email, name);
    } catch {
      loginUser(email, name);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth-header">
        <div className="auth-logo">🛡️</div>
        <h1 className="auth-title">Begin Your Quest</h1>
        <p className="auth-subtitle">Create your character and level up your life</p>
      </div>

      {errorMsg && (
        <div style={{ padding: "10px 14px", background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: "var(--radius)", color: "var(--rose)", fontSize: "13px", marginBottom: "16px" }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Hero Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="e.g. Eldrin the Focused"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="hero@realm.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Secret Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="At least 8 characters"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          style={{ marginTop: "8px", padding: "13px" }}
          disabled={loading}
        >
          {loading ? "✨ Forging Character..." : "✨ Forge Your Character"}
        </button>
      </form>

      <div className="auth-divider" style={{ margin: "24px 0" }}>OR</div>

      <div className="auth-footer">
        Already registered?{" "}
        <a href="/login" style={{ fontWeight: 700, color: "var(--violet-light)" }}>
          Log In
        </a>
      </div>
    </div>
  );
}