"use client";

import Image from "next/image";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { LogoCarousel } from "@/components/LogoCarousel";
import { Testimonials } from "@/components/Testimonials";

const trackRecordStats = [
  { value: "10K+", label: "Professionals Trained For Exceptional Career Success" },
  { value: "200+", label: "Sessions Delivered With Unmatched Learning Excellence" },
  { value: "5K+", label: "Active Learners Engaged In Dynamic Courses" },
  { value: "120K+", label: "Enterprise Learners Supported" },
];

const partners = [
  {
    id: "rel",
    name: "Reliance",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/rel.png",
  },
  {
    id: "hcl",
    name: "HCL",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hcl.png",
  },
  {
    id: "ibm",
    name: "IBM",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/ibm.png",
  },
  {
    id: "crif",
    name: "CRIF",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/crif.png",
  },
  {
    id: "adp",
    name: "ADP",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/adp.svg",
  },
  {
    id: "bayer",
    name: "Bayer",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/bayer.svg",
  },
];

const domainExpertise = [
  { title: "Product & Innovation Hub", description: "Drive innovation through product leadership and strategic thinking." },
  { title: "Gen-AI Mastery", description: "Leverage generative AI to transform business processes and organizational capabilities." },
  { title: "Leadership Elevation", description: "Develop strategic leaders capable of driving transformation and innovation." },
  { title: "Tech & Data Insights", description: "Master emerging technologies and data analytics for competitive advantage." },
  { title: "Operations Excellence", description: "Optimize operational efficiency and implement best practices across enterprise." },
  { title: "Digital Enterprise", description: "Build digital-first capabilities and navigate enterprise transformation." },
  { title: "Fintech Innovation Lab", description: "Explore cutting-edge financial technology and digital banking solutions." },
];

const courseSegmentation = [
  {
    title: "Program Specific",
    subtitle: "Certificate, Executive, Post Graduate Certificate",
    image: "/program_specific.png",
  },
  {
    title: "Industry Specific",
    subtitle: "IT, Healthcare, Retail, Finance, Education, Manufacturing",
    image: "/industry_specific.png",
  },
  {
    title: "Topic Specific",
    subtitle: "Machine Learning, Design, Analytics, Cybersecurity, Cloud",
    image: "/topic_specific.png",
  },
  {
    title: "Level Specific",
    subtitle: "Senior Leadership, Mid-Career Professionals, Freshers",
    image: "/level_specific.png",
  },
];

const strategicSkills = [
  { title: "Tech Professionals", description: "Enhance expertise, embrace tech, drive innovation." },
  { title: "Non-Tech Professionals", description: "Adapt digitally, collaborate in tech environments." },
  { title: "Emerging Professionals", description: "Develop powerful skills for rapid career growth." },
  { title: "Senior Professionals", description: "Strengthen leadership, enhance strategic decisions." },
  { title: "Who Should Join?", description: "Professionals at any career stage seeking transformative upskilling." },
];

const deliverySteps = [
  { title: "Skill Gap Analysis", description: "Assess team skill gaps and developmental needs." },
  { title: "Customized Training Plan", description: "Create a tailored roadmap addressing organizational goals." },
  { title: "Flexible Program Delivery", description: "Deliver adaptable programs aligned with industry and organizational needs." },
];

const faqItems = [
  { category: "About the Course", items: [
    { q: "What types of corporate training programs does Accredian offer?", a: "We offer comprehensive corporate training programs including capability mapping, leadership development, technical skilling, and digital transformation programs tailored to your organizational needs." },
    { q: "What domain specializations are available?", a: "Our specializations include Gen-AI, Leadership, Tech & Data, Operations, Digital Enterprise, Fintech, and Product Innovation across multiple proficiency levels." },
  ]},
  { category: "About the Delivery", items: [
    { q: "How are programs delivered?", a: "Programs are delivered through a blended model including live mentor-led sessions, interactive workshops, work-integrated projects, and flexible self-paced modules." },
    { q: "What is the typical program duration?", a: "Program duration varies from intensive 4-week bootcamps to comprehensive 12-week transformation programs, customized based on your requirements." },
  ]},
  { category: "Miscellaneous", items: [
    { q: "Do you provide certification?", a: "Yes, all programs conclude with recognized certifications that validate learner competency and are valued by industry partners." },
    { q: "What's the cost structure?", a: "We offer flexible pricing models based on program scope, team size, and customization requirements. Contact our sales team for a personalized quote." },
  ]},
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    company: "",
    domain: "",
    candidates: "",
    deliveryMode: "",
    location: "",
  });

  const enquiryDomains = [
    "Product Management",
    "CFO",
    "Data Science",
    "Artificial Intelligence",
    "Human Resource",
    "Strategy & Leadership",
    "General Management",
    "Digital Transformation",
    "Business Management",
    "Finance",
    "Project Management",
    "Senior Management",
  ];

  const deliveryModes = ["Offline", "Online"];

  const openEnquiry = () => {
    setEnquirySubmitted(false);
    setEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setEnquiryOpen(false);
    setEnquirySubmitted(false);
  };

  const handleEnquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnquirySubmitted(true);
  };

  return (
    <div id="top" className="bg-[#f9f9f0]">
      <Navbar />

      <main>
        {/* ---------------------------------------Hero Section */}
        <section id="home" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(15,111,124,0.18),transparent_42%),radial-gradient(circle_at_88%_10%,rgba(250,204,21,0.22),transparent_40%)]" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col px-5 py-16 md:px-8 md:py-24">
            <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
              Next-Gen Expertise For Your Enterprise
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Cultivate high-performance teams through expert learning, industry insights, and strategic guidance tailored to your organizational goals.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#domain-expertise" className="rounded-full bg-slate-900 px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700">
                Explore Now
              </a>
              <button
                type="button"
                onClick={openEnquiry}
                className="rounded-full border border-slate-300 bg-white px-7 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-slate-900"
              >
                Enquire Now
              </button>
            </div>



            {/*--------------------------------------- Value Props */}
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-[#0f6f7c]/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#0f6f7c]">✓</span>
                </div>
                <h3 className="font-semibold text-slate-900">Tailored Solutions</h3>
                <p className="text-sm text-slate-600">Programs designed specifically for your organizational challenges and goals.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-[#0f6f7c]/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#0f6f7c]">✓</span>
                </div>
                <h3 className="font-semibold text-slate-900">Industry Insights</h3>
                <p className="text-sm text-slate-600">Expert-led programs informed by real-world industry trends and best practices.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-[#0f6f7c]/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#0f6f7c]">✓</span>
                </div>
                <h3 className="font-semibold text-slate-900">Expert Guidance</h3>
                <p className="text-sm text-slate-600">Mentorship from seasoned professionals and industry thought leaders.</p>
              </div>
            </div>
          </div>
        </section>


        {/* ---------------------------------------Track Record */}
        <section id="stats" className="border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">Our Track Record</h2>
            <p className="mt-2 text-center text-slate-600">The Numbers Behind Our Success</p>
            <div className="mt-12 grid gap-8 md:grid-cols-4">
              {trackRecordStats.map((stat) => (
                <div key={stat.value} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                  <p className="text-4xl font-bold text-[#0f6f7c]">{stat.value}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------- Partnerships */}
        <section id="clients" className="bg-slate-50">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">Our Proven Partnerships</h2>
            <p className="mt-2 text-center text-slate-600">Successful Collaborations With the Industry's Best</p>
            <LogoCarousel logos={partners} />
          </div>
        </section>

        {/* --------------------------------------- Accredian Edge / USP */}
        <section id="edge" className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <SectionHeading
              eyebrow="Strategic Advantage"
              title="The Accredian Edge"
              description="Key Aspects of Our Strategic Training"
            />
            <div className="mt-8 relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 to-white p-2 shadow-sm md:p-3">
              <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#0f6f7c]/10 blur-3xl" />
              <div className="relative rounded-2xl border border-slate-200/80 bg-white p-1 shadow-sm">
                <Image
                  src="/accredian-edge-usp-v3.svg"
                  alt="Accredian Edge strategic framework"
                  width={1100}
                  height={580}
                  className="h-auto w-full rounded-xl object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------- Domain Expertise */}
        <section id="domain-expertise" className="bg-slate-50">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <SectionHeading
              eyebrow="Specializations"
              title="Our Domain Expertise"
              description="Specialized Programs Designed to Fuel Innovation"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
              {domainExpertise.map((domain) => (
                <div key={domain.title} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:border-[#0f6f7c]/30 transition">
                  <div className="h-12 w-12 rounded-lg bg-[#0f6f7c]/10 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#0f6f7c]">◆</span>
                  </div>
                  <h3 className="font-semibold text-slate-900">{domain.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{domain.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------- Course Segmentation */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <SectionHeading
              eyebrow="Customization"
              title="Tailored Course Segmentation"
              description="Explore Custom-fit Courses Designed to Address Every Professional Focus"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {courseSegmentation.map((course) => (
                <div key={course.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-blue-50 to-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-5">
                  <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                    <Image
                      src={course.image}
                      alt={`${course.title} visual`}
                      width={640}
                      height={360}
                      className="h-36 w-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900">{course.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{course.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------- Strategic Enhancement */}
        <section className="bg-slate-50">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <SectionHeading
              eyebrow="Professional Growth"
              title="Strategic Skill Enhancement"
              description="Programs tailored for every professional segment"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {strategicSkills.map((skill) => (
                <div key={skill.title} className="rounded-2xl bg-white p-6 border border-slate-200 hover:shadow-lg transition">
                  <h3 className="font-semibold text-slate-900">{skill.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------- CAT Framework */}
        <section id="cat" className="bg-linear-to-r from-[#0f6f7c] to-[#0f6f7c]/80 text-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d9f7fa]">Our Framework</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">The CAT Framework</h2>
              <p className="mt-3 text-[#d9f7fa]">Our Proven Approach to Learning Excellence</p>
            </div>
            <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-white/10 p-2 backdrop-blur md:p-3">
              <div className="rounded-2xl border border-white/20 bg-white p-1">
                <Image
                  src="/catframework.svg"
                  alt="CAT framework diagram"
                  width={980}
                  height={680}
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------- Delivery Process */}
        <section id="how-it-works" className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <SectionHeading
              eyebrow="Process"
              title="⚙️ How We Deliver Results That Matter?"
              description="A Structured Three-Step Approach to Skill Development"
            />
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {deliverySteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f6f7c] text-lg font-bold text-white">
                        {index + 1}
                      </div>
                      {index < deliverySteps.length - 1 && (
                        <div className="mt-2 w-1 h-12 bg-linear-to-b from-[#0f6f7c] to-slate-200" />
                      )}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------- FAQs */}
        <section id="faqs" className="bg-slate-50">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">❓ Frequently Asked Questions</h2>
              <p className="mt-2 text-slate-600">Everything you need to know about our training programs</p>
            </div>

            <div className="space-y-3">
              {faqItems.map((section) => (
                <div key={section.category}>
                  <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-3">{section.category}</h3>
                  {section.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setOpenFaq(openFaq === `${section.category}-${idx}` ? null : `${section.category}-${idx}`)}
                      className="w-full text-left rounded-lg border border-slate-200 bg-white p-4 transition hover:border-[#0f6f7c] mb-2"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-slate-900 flex-1">{item.q}</h4>
                        <span className={`ml-4 text-[#0f6f7c] transition ${openFaq === `${section.category}-${idx}` ? "rotate-180" : ""}`}>
                          ▼
                        </span>
                      </div>
                      {openFaq === `${section.category}-${idx}` && (
                        <p className="mt-3 text-sm text-slate-600">{item.a}</p>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------- Testimonials */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* --------------------------------------- CTA Section */}
        <section id="contact" className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <div className="rounded-3xl bg-gradient-to-r from-[#0f6f7c] to-[#0f6f7c]/80 px-6 py-12 text-white md:px-10 md:py-16">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9f7fa]">Get Started Today</p>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                  Want to Learn More About Our Training Solutions?
                </h2>
                <p className="mt-4 text-[#d9f7fa]">Get expert guidance for your team's success and unlock your organization's full potential.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={openEnquiry}
                    className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-[#0f6f7c] transition hover:bg-slate-100"
                  >
                    Enquire Now
                  </button>
                  <a href="#top" className="rounded-full border border-white/50 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white">
                    Back to Top
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {enquiryOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
          onClick={closeEnquiry}
        >
          <div
            className="grid w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.28)] md:grid-cols-[1fr_1.1fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="hidden min-h-full bg-[linear-gradient(180deg,rgba(15,111,124,0.08),rgba(15,111,124,0.18))] p-6 md:block">
              <div className="flex h-full items-center justify-center overflow-hidden rounded-[24px] bg-slate-100">
                <Image
                  src="/program_specific.png"
                  alt="Enquiry visual"
                  width={640}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="relative p-5 md:p-6">
              <button
                type="button"
                onClick={closeEnquiry}
                className="absolute right-4 top-4 rounded-full p-2 text-2xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close enquiry form"
              >
                ×
              </button>

              <div className="pr-10 md:pr-12">
                <h2 className="text-2xl font-bold text-slate-900">Enquire Now</h2>
                <p className="mt-2 text-sm text-slate-600">Share a few details and we’ll get back to you.</p>
              </div>

              {enquirySubmitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  Thank you. Your enquiry has been captured locally. If you want, I can connect this form to a backend API next.
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={enquiryForm.name}
                      onChange={(event) => setEnquiryForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Enter Name"
                      className="w-full border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0f6f7c]"
                    />
                    <input
                      type="email"
                      value={enquiryForm.email}
                      onChange={(event) => setEnquiryForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="Enter Email"
                      className="w-full border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0f6f7c]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={enquiryForm.company}
                      onChange={(event) => setEnquiryForm((current) => ({ ...current, company: event.target.value }))}
                      placeholder="Enter company name"
                      className="w-full border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0f6f7c]"
                    />
                    <input
                      value={enquiryForm.candidates}
                      onChange={(event) => setEnquiryForm((current) => ({ ...current, candidates: event.target.value }))}
                      placeholder="Enter No. of candidates"
                      className="w-full border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0f6f7c]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative">
                      <select
                        value={enquiryForm.domain}
                        onChange={(event) => setEnquiryForm((current) => ({ ...current, domain: event.target.value }))}
                        className="w-full appearance-none border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-500 outline-none transition focus:border-[#0f6f7c]"
                      >
                        <option value="">Select Domain</option>
                        {enquiryDomains.map((domain) => (
                          <option key={domain} value={domain}>
                            {domain}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400">⌄</span>
                    </div>

                    <div className="relative">
                      <select
                        value={enquiryForm.deliveryMode}
                        onChange={(event) => setEnquiryForm((current) => ({ ...current, deliveryMode: event.target.value }))}
                        className="w-full appearance-none border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-500 outline-none transition focus:border-[#0f6f7c]"
                      >
                        <option value="">Select Mode of Delivery</option>
                        {deliveryModes.map((mode) => (
                          <option key={mode} value={mode}>
                            {mode}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400">⌄</span>
                    </div>
                  </div>

                  <input
                    value={enquiryForm.location}
                    onChange={(event) => setEnquiryForm((current) => ({ ...current, location: event.target.value }))}
                    placeholder="Eg: Gurgaon, Delhi, India"
                    className="w-full border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0f6f7c]"
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-[#2b78e4] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f68cb]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
