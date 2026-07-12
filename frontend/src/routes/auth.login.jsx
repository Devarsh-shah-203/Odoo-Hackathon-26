import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@transitops.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="text-3xl font-black tracking-tight bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
            TransitOps ✦
          </div>
          <p className="mt-1 text-sm text-white/60">Log in to run your fleet.</p>
        </div>

        <form
          onSubmit={submit}
          className="relative rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-400/10" />
          <h2 className="mb-6 text-2xl font-bold text-white">Welcome back 👋</h2>

          <div className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@transitops.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {error && (
              <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-sm text-red-200">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? "Signing in..." : "Sign in →"}
            </Button>

            <div className="flex items-center justify-between text-xs text-white/50">
              <Link to="/auth/login" className="hover:text-white">Forgot password?</Link>
              <span>No account? Ask your Fleet Manager.</span>
            </div>
          </div>
        </form>

        <p className="mt-4 text-center text-xs text-white/40">
          Made with 💜 for the road.
        </p>
      </div>
    </AuthLayout>
  );
}