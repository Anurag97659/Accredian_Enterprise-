"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
};

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        const data = (await response.json()) as { testimonials: Testimonial[] };
        setItems(data.testimonials ?? []);
      } catch (error) {
        console.error("Unable to fetch testimonials", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    void loadTestimonials();
  }, []);

  return (
    <section id="testimonials" className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Voices from teams"
        title="Enterprise leaders trust Accredian for outcomes, not vanity metrics"
        description="This section is powered by a mock API route to demonstrate clean data integration in App Router."
      />

      {loading ? (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <p className="text-sm leading-7 text-slate-700">“{item.quote}”</p>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
                <p className="mt-1 text-xs font-medium text-[#0f6f7c]">{item.company}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
