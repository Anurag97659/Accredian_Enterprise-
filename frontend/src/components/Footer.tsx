const footerColumns = [
  {
    title: "Company",
    links: ["About", "Leadership", "Careers", "Contact"],
  },
  {
    title: "Enterprise",
    links: ["Program Design", "Skill Assessment", "Mentor Network", "Talent Outcomes"],
  },
  {
    title: "Resources",
    links: ["Case Studies", "Blog", "Help Center", "Partner Support"],
  },
  {
    title: "Contact Us",
    content: {
      email: "enterprise@accredian.com",
      address: "4th Floor, 250, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana"
    }
  },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.6fr_2fr] md:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6ed4db]">Accredian Enterprise</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Design workforce learning with measurable impact.</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            From capability mapping to final placements, we help organizations build role-ready teams faster.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-white">{column.title}</h4>
              {column.links ? (
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  {column.links.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-slate-400">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-1">Email</p>
                    <a href="mailto:enterprise@accredian.com" className="hover:text-slate-200 transition">
                      {column.content.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-1">Office</p>
                    <p>{column.content.address}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Accredian Enterprise. All rights reserved.</p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
