"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthUser, getCurrentUser, updateAccountDetails } from "@/lib/auth";

export default function AccountDetailsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullname: "",
    address: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = (await getCurrentUser()) as AuthUser | null;
        if (currentUser) {
          setForm({
            username: currentUser.username ?? "",
            email: currentUser.email ?? "",
            fullname: currentUser.fullname ?? "",
            address: currentUser.address ?? "",
          });
        }
      } catch (loadError) {
        console.error(loadError);
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    void loadUser();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const response = await updateAccountDetails({
        username: form.username.trim().toLowerCase(),
        email: form.email.trim().toLowerCase(),
        fullname: form.fullname.trim(),
        address: form.address.trim(),
      });

      const updatedUser = response.data;
      if (updatedUser) {
        setForm({
          username: updatedUser.username ?? "",
          email: updatedUser.email ?? "",
          fullname: updatedUser.fullname ?? "",
          address: updatedUser.address ?? "",
        });
      }

      setMessage(response.message ?? "Details updated successfully.");
      router.refresh();
    } catch (submitError) {
      const nextError = submitError instanceof Error ? submitError.message : "Could not update your details.";
      setError(nextError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f9f9f0] px-5 py-12 md:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0f6f7c]">Account settings</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Change details</h1>
          </div>
          <Link href="/" className="text-sm font-semibold text-[#0f6f7c] hover:underline">
            Back home
          </Link>
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-slate-600">Loading your profile...</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  value={form.username}
                  onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#0f6f7c]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#0f6f7c]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="fullname">
                Full name
              </label>
              <input
                id="fullname"
                value={form.fullname}
                onChange={(event) => setForm((current) => ({ ...current, fullname: event.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#0f6f7c]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                rows={3}
                value={form.address}
                onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
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
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}