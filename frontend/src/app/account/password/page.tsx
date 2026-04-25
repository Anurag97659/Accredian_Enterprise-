"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { changePassword } from "@/lib/auth";

export default function AccountPasswordPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("Please complete all password fields.");
      return;
    }

    setSaving(true);
    try {
      const response = await changePassword(form);
      setMessage(response.message ?? "Password changed successfully.");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      router.refresh();
    } catch (submitError) {
      const nextError = submitError instanceof Error ? submitError.message : "Could not change your password.";
      setError(nextError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f9f9f0] px-5 py-12 md:px-8">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0f6f7c]">Account settings</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Change password</h1>
          </div>
          <Link href="/" className="text-sm font-semibold text-[#0f6f7c] hover:underline">
            Back home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="oldPassword">
              Current password
            </label>
            <input
              id="oldPassword"
              type="password"
              value={form.oldPassword}
              onChange={(event) => setForm((current) => ({ ...current, oldPassword: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#0f6f7c]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="newPassword">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              value={form.newPassword}
              onChange={(event) => setForm((current) => ({ ...current, newPassword: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#0f6f7c]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#0f6f7c]"
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          {message ? <p className="text-sm font-medium text-emerald-700">{message}</p> : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-[#0f6f7c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d5a65] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}