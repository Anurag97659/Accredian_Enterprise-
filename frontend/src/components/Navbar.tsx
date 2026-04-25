"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthUser, deleteAccount, getCurrentUser, logoutUser } from "@/lib/auth";

const links = [
  { href: "#home", label: "Home", icon: "" },
  { href: "#stats", label: "Stats", icon: "" },
  { href: "#clients", label: "Clients", icon: "" },
  { href: "#edge", label: "Accredian Edge", icon: "" },
  { href: "#cat", label: "CAT", icon: "" },
  { href: "#how-it-works", label: "How It Works", icon: "" },
  { href: "#faqs", label: "FAQs", icon: "" },
  { href: "#testimonials", label: "Testimonials", icon: "" },
];

export function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (mounted) setUser(currentUser);
      } catch {
        if (mounted) setUser(null);
      }
    };

    const handleAuthChange = () => {
      void loadUser();
    };

    void loadUser();
    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      mounted = false;
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setSettingsOpen(false);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setSettingsOpen(false);
      setMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Delete your account permanently?");
    if (!confirmed) return;

    try {
      await deleteAccount();
      setUser(null);
      setSettingsOpen(false);
      setMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f9f9f0]/90 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="#top" className="flex items-center gap-2 shrink-0">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0f6f7c] text-sm font-bold text-white">A</span>
          <span className="text-base md:text-lg font-semibold tracking-tight text-slate-900 whitespace-nowrap">Accredian</span>
        </Link>

        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          ☰ Menu
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-[#0f6f7c] hover:bg-[#0f6f7c]/5 rounded-lg"
            >
              <span className="text-base">{link.icon}</span>
              <span className="hidden xl:inline">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative flex items-center gap-2">
              <div className="rounded-full border border-[#0f6f7c]/30 bg-[#0f6f7c]/10 px-4 py-2 text-sm font-semibold text-[#0f6f7c]">
                <span>{user.username}</span>
              </div>

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-lg leading-none text-slate-700 shadow-sm transition hover:border-[#0f6f7c] hover:text-[#0f6f7c] hover:shadow-md"
                onClick={() => setSettingsOpen((value) => !value)}
                aria-label="Open account settings"
                aria-expanded={settingsOpen}
              >
                ⚙
              </button>

              {settingsOpen ? (
                <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl">
                  <Link
                    href="/account/details"
                    className="block rounded-2xl px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={() => setSettingsOpen(false)}
                  >
                    Change Details
                  </Link>
                  <Link
                    href="/account/password"
                    className="block rounded-2xl px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={() => setSettingsOpen(false)}
                  >
                    Change Password
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-2xl px-5 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={async () => {
                      setSettingsOpen(false);
                      await handleLogout();
                    }}
                  >
                    Logout
                  </button>
                  <button
                    type="button"
                    className="block w-full rounded-2xl px-5 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    onClick={async () => {
                      setSettingsOpen(false);
                      await handleDeleteAccount();
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-[#0f6f7c] hover:text-[#0f6f7c]"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#0f6f7c] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d5a65] shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#0f6f7c]/10 transition"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
            {user ? (
              <div className="mt-3 space-y-2 rounded-2xl border border-[#0f6f7c]/20 bg-[#0f6f7c]/5 p-3">
                <div className="flex items-center justify-between rounded-full border border-[#0f6f7c]/30 bg-white px-4 py-2.5 text-sm font-semibold text-[#0f6f7c]">
                  <span>{user.username}</span>
                  <span>⚙</span>
                </div>
                <Link
                  href="/account/details"
                  className="block rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Change Details
                </Link>
                <Link
                  href="/account/password"
                  className="block rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Change Password
                </Link>
                <button
                  type="button"
                  className="block w-full rounded-xl bg-white px-4 py-2.5 text-left text-sm font-medium text-slate-700"
                  onClick={async () => {
                    setMenuOpen(false);
                    await handleLogout();
                  }}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="block w-full rounded-xl bg-red-50 px-4 py-2.5 text-left text-sm font-semibold text-red-600"
                  onClick={async () => {
                    setMenuOpen(false);
                    await handleDeleteAccount();
                  }}
                >
                  Delete Account
                </button>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-800 transition hover:border-[#0f6f7c] hover:text-[#0f6f7c]"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[#0f6f7c] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#0d5a65]"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
