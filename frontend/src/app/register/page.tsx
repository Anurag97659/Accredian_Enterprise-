"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setVerificationUrl("");

    if (!fullname.trim() || !username.trim() || !email.trim() || !address.trim() || !password.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({
        fullname: fullname.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        address: address.trim(),
        password,
      });

      setSuccess(response.message ?? "Registration successful. Please verify your email.");
      setVerificationUrl(response?.data?.verificationUrl ?? "");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f9f9f0] px-5 py-12 md:px-8">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Sign Up</h1>
        <p className="mt-2 text-sm text-slate-600">Create your Accredian account.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullname" className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="fullname"
              value={fullname}
              onChange={(event) => setFullname(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0f6f7c]"
              placeholder="Anurag Nidhi"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0f6f7c]"
              placeholder="anurag"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0f6f7c]"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium text-slate-700">
              Address
            </label>
            <input
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0f6f7c]"
              placeholder="City, State"
              autoComplete="street-address"
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
              autoComplete="new-password"
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          {success ? <p className="text-sm font-medium text-emerald-700">{success}</p> : null}

          {verificationUrl ? (
            <a
              href={verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-sm font-semibold text-[#0f6f7c] underline"
            >
              Verify Email Now
            </a>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0f6f7c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d5a65] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#0f6f7c] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
