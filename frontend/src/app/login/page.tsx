"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier || !password.trim()) {
      setError("Please enter your email/username and password.");
      return;
    }

    setLoading(true);
    try {
      const payload = trimmedIdentifier.includes("@")
        ? { email: trimmedIdentifier.toLowerCase(), password }
        : { username: trimmedIdentifier.toLowerCase(), password };

      await loginUser(payload);
      router.push("/");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f9f9f0] px-5 py-12 md:px-8">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
        <p className="mt-2 text-sm text-slate-600">Welcome back. Login to continue.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="identifier" className="mb-1 block text-sm font-medium text-slate-700">
              Email or Username
            </label>
            <input
              id="identifier"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0f6f7c]"
              placeholder="you@example.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0f6f7c]"
              placeholder="********"
              autoComplete="current-password"
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0f6f7c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d5a65] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          New here?{" "}
          <Link href="/register" className="font-semibold text-[#0f6f7c] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
