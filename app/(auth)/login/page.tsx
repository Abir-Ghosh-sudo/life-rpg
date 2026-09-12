"use client";

import { useState } from "react";
import { useGameState } from "@/lib/game/game-context";
import { loginAction } from "@/features/auth/actions";

export default function LoginPage() {
  const { loginUser } = useGameState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      // Call backend Server Action
      const result = await loginAction({ email, password }).catch(() => null);

      if (result && !result.success && result.message) {
        const isFetchError =
          result.message.toLowerCase().includes("fetch failed") ||
          result.message.toLowerCase().includes("failed to fetch") ||
          result.message.toLowerCase().includes("network");

        if (!isFetchError) {
          setErrorMsg(result.message);
          setLoading(false);
          return;
        }
      }

      // Log in hero state and enter realm
      loginUser(email);
    } catch {
      // Fallback to local session
      loginUser(email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth-header">
        <div className="auth-logo">⚔️</div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Continue your real-life heroic journey</p>
      </div>

      {errorMsg && (
        <div style={{ padding: "10px 14px", background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: "var(--radius)", color: "var(--rose)", fontSize: "13px", marginBottom: "16px" }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label className="form-label" htmlFor="password">Password</label>
            <a href="/forgot-password" style={{ fontSize: "12px", color: "var(--violet-light)" }}>
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="••••••••••••"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          style={{ marginTop: "8px", padding: "13px" }}
          disabled={loading}
        >
          {loading ? "⚔️ Authenticating..." : "⚔️ Log In to Realm"}
        </button>
      </form>

      <div className="auth-divider" style={{ margin: "24px 0" }}>OR</div>

      <div className="auth-footer">
        New adventurer?{" "}
        <a href="/signup" style={{ fontWeight: 700, color: "var(--violet-light)" }}>
          Create an Account
        </a>
      </div>
    </div>
  );
}