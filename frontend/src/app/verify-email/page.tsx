"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { verifyEmail } from "@/lib/auth";

type VerificationState = "loading" | "success" | "error";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<VerificationState>("loading");
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    if (!token || !id) {
      setState("error");
      setMessage("This verification link is missing required data.");
      return;
    }

    let active = true;

    const runVerification = async () => {
      try {
        const response = await verifyEmail(token, id);
        if (!active) return;

        setState("success");
        setMessage(response.message ?? "Email verified successfully. You can now sign in.");
      } catch (verificationError) {
        if (!active) return;

        const errorMessage =
          verificationError instanceof Error ? verificationError.message : "Email verification failed";
        setState("error");
        setMessage(errorMessage);
      }
    };

    void runVerification();

    return () => {
      active = false;
    };
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-[#f9f9f0] px-5 py-12 md:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0f6f7c]">Account verification</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {state === "success" ? "Email verified" : state === "error" ? "Verification failed" : "Verifying..."}
        </h1>
        <p className={`mt-3 text-sm leading-6 ${state === "error" ? "text-red-600" : "text-slate-600"}`}>
          {message}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/login"
            className="rounded-full bg-[#0f6f7c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d5a65]"
          >
            Go to Sign In
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-[#0f6f7c] hover:text-[#0f6f7c]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

function VerifyEmailFallback() {
  return (
    <main className="min-h-screen bg-[#f9f9f0] px-5 py-12 md:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0f6f7c]">Account verification</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Verifying...</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Verifying your email address...</p>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}