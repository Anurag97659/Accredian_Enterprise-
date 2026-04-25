type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  invert?: boolean;
};

export function SectionHeading({ eyebrow, title, description, invert = false }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${invert ? "text-[#6ed4db]" : "text-[#0f6f7c]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl font-semibold leading-tight md:text-4xl ${invert ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${invert ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
    </div>
  );
}
