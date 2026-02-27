"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  service: string;
  date: string;
  timeWindow: string;
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  message: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const WrenchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const WindIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.499z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <WrenchIcon />,
    title: "HVAC Repairs",
    desc: "Fast diagnosis and expert repair for all makes and models. We fix the problem right the first time — no guesswork, no runaround.",
    color: "from-purple-900/40 to-indigo-900/40",
    glow: "hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]",
  },
  {
    icon: <HomeIcon />,
    title: "New Installations",
    desc: "Upgrade to a high-efficiency system sized perfectly for your home. Our certified technicians handle everything from permits to startup.",
    color: "from-blue-900/40 to-indigo-900/40",
    glow: "hover:shadow-[0_0_30px_rgba(147,197,253,0.2)]",
  },
  {
    icon: <ShieldIcon />,
    title: "Preventative Maintenance",
    desc: "Keep your system running at peak performance year-round. Our tune-up plans catch small issues before they become expensive repairs.",
    color: "from-purple-900/40 to-blue-900/40",
    glow: "hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]",
  },
  {
    icon: <WindIcon />,
    title: "Duct Cleaning",
    desc: "Remove years of buildup — dust, allergens, mold spores — from your ductwork. Breathe cleaner air and improve system efficiency.",
    color: "from-indigo-900/40 to-blue-900/40",
    glow: "hover:shadow-[0_0_30px_rgba(147,197,253,0.2)]",
  },
  {
    icon: <BoltIcon />,
    title: "Emergency Service",
    desc: "HVAC emergencies don't wait for business hours — and neither do we. Our on-call technicians respond fast when you need us most.",
    color: "from-red-900/20 to-purple-900/40",
    glow: "hover:shadow-[0_0_30px_rgba(248,113,113,0.15)]",
  },
  {
    icon: <CreditCardIcon />,
    title: "Financing Options",
    desc: "Don't let cost stand between you and comfort. Flexible financing plans available with approved credit — get the system you need today.",
    color: "from-green-900/20 to-blue-900/40",
    glow: "hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
  },
];

const trustBlocks = [
  {
    icon: "🏅",
    title: "Licensed & Insured",
    desc: "Every technician is fully licensed, bonded, and insured for your complete peace of mind.",
  },
  {
    icon: "⚡",
    title: "Same-Day Service",
    desc: "We offer same-day appointments for urgent repairs. Your comfort can't wait — and we won't make it.",
  },
  {
    icon: "📋",
    title: "Free Estimates",
    desc: "No surprises, no pressure. Get a transparent, no-obligation estimate before any work begins.",
  },
  {
    icon: "⭐",
    title: "5-Star Rated Technicians",
    desc: "Our certified pros consistently earn top ratings for their professionalism, speed, and clean work.",
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    location: "Houston, TX",
    text: "My AC went out on a Friday evening in August. PurpleAir had a tech at my door by 9am Saturday. Fixed within an hour. Absolute lifesavers — these guys are the real deal.",
    service: "Emergency AC Repair",
  },
  {
    name: "Jennifer R.",
    location: "Dallas, TX",
    text: "Got quotes from 3 companies. PurpleAir came in competitive, were upfront about everything, and the install was spotless. My new Carrier system runs perfectly. 10/10 experience.",
    service: "New System Installation",
  },
  {
    name: "David K.",
    location: "Austin, TX",
    text: "Signed up for their maintenance plan last year. Caught a refrigerant leak before it became a full breakdown. Saved me thousands. Worth every penny for the peace of mind alone.",
    service: "Preventative Maintenance",
  },
];

const serviceOptions = [
  "AC Repair",
  "Heating Repair",
  "New AC Installation",
  "New Heating System",
  "Preventative Maintenance",
  "Duct Cleaning",
  "Emergency Service",
  "Free Estimate",
];

const timeWindows = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
  "Flexible / First Available",
];

const galleryItems = [
  {
    label: "AC Installation",
    category: "Installation",
    color: "from-purple-900/70 to-indigo-900/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 opacity-40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: "Rooftop Unit Replacement",
    category: "Commercial",
    color: "from-blue-900/70 to-indigo-900/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 opacity-40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    label: "Duct Cleaning & Sealing",
    category: "Duct Work",
    color: "from-indigo-900/70 to-purple-900/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 opacity-40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Heat Pump Install",
    category: "Installation",
    color: "from-purple-900/70 to-blue-900/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 opacity-40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    label: "Emergency Repair",
    category: "Repair",
    color: "from-red-900/50 to-purple-900/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 opacity-40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: "Preventative Maintenance",
    category: "Maintenance",
    color: "from-green-900/40 to-blue-900/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 opacity-40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    date: "",
    timeWindow: "",
    fullName: "",
    phone: "",
    email: "",
    zipCode: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PurpleAir HVAC — New Appointment Request:", formData);
    setSubmitted(true);
  };

  const scrollToForm = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen" style={{ background: "#0f0a1e" }}>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-purple-900/30"
        style={{ background: "rgba(15,10,30,0.85)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
              <span className="text-white font-bold text-sm">PA</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">PurpleAir<span className="text-gradient"> HVAC</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <a href="#booking" className="hover:text-white transition-colors">Book Service</a>
          </div>
          <a href="tel:+14074584032"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
            <PhoneIcon />
            <span className="hidden sm:inline">(407) 458-4032</span>
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{ background: "linear-gradient(135deg, #2e1065 0%, #1e1b4b 45%, #1e3a5f 100%)" }}>

        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border text-sm font-medium"
            style={{
              background: "rgba(124,58,237,0.15)",
              borderColor: "rgba(167,139,250,0.3)",
              color: "#a78bfa",
            }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Financing Available — 0% APR for Qualified Customers
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
            Fast &amp; Reliable<br />
            <span className="text-gradient">HVAC Service</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
            Book Online in Minutes
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Expert Repairs · New Installations · Preventative Maintenance · Duct Cleaning<br />
            Licensed &amp; Insured Technicians Serving the Greater Metro Area
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToForm}
              className="group flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
              style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
              <CalendarIcon />
              Schedule Service
            </button>
            <a href="tel:+14074584032"
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 border"
              style={{
                color: "#93c5fd",
                borderColor: "rgba(147,197,253,0.4)",
                background: "rgba(147,197,253,0.08)",
              }}>
              <PhoneIcon />
              Call Now
            </a>
          </div>

          {/* Quick trust row */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {["Licensed & Insured", "Same-Day Available", "Free Estimates", "5-Star Rated"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="text-green-400"><CheckIcon /></span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0f0a1e)" }} />
      </section>

      {/* ── SERVICES GRID ───────────────────────────────────────────────────── */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#a78bfa" }}>What We Do</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Complete HVAC Solutions</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              From emergency repairs to full system replacements, our certified technicians handle every aspect of your home comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title}
                className={`group rounded-2xl p-7 border transition-all duration-300 cursor-default bg-gradient-to-br ${s.color} ${s.glow} hover:-translate-y-1`}
                style={{ borderColor: "rgba(167,139,250,0.15)" }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────────────────────────────────────── */}
      <section id="why-us" className="py-24 px-6"
        style={{ background: "linear-gradient(180deg, transparent, rgba(46,16,101,0.15), transparent)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#93c5fd" }}>Why PurpleAir</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Built on Trust &amp; Results</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              We don't just fix HVAC systems — we build long-term relationships with homeowners who deserve reliable service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBlocks.map((b) => (
              <div key={b.title}
                className="rounded-2xl p-8 text-center border transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(167,139,250,0.15)",
                }}>
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#a78bfa" }}>Customer Stories</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Real Results, Real Homeowners</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Don't take our word for it — here's what our customers say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name}
                className="rounded-2xl p-8 border flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]"
                style={{
                  background: "linear-gradient(135deg, rgba(76,29,149,0.12), rgba(30,58,95,0.12))",
                  borderColor: "rgba(167,139,250,0.2)",
                }}>
                {/* Stars */}
                <div className="flex gap-1 mb-5" style={{ color: "#fbbf24" }}>
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-6 italic" style={{ color: "rgba(255,255,255,0.75)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t pt-5" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs mt-1" style={{ color: "#a78bfa" }}>{t.location} · {t.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-24 px-6"
        style={{ background: "linear-gradient(180deg, transparent, rgba(46,16,101,0.12), transparent)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#93c5fd" }}>Our Work</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">See the PurpleAir Difference</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              From emergency repairs to full system installs — every job gets the same meticulous attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryItems.map((item, i) => (
              <div key={i}
                className={`group relative rounded-2xl overflow-hidden border aspect-[4/3] bg-gradient-to-br ${item.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(167,139,250,0.2)]`}
                style={{ borderColor: "rgba(167,139,250,0.15)" }}>
                {/* Subtle grid texture */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }} />
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ color: "#a78bfa" }}>
                  {item.icon}
                </div>
                {/* Overlay label */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 transition-all duration-300"
                  style={{ background: "linear-gradient(to top, rgba(15,10,30,0.85), transparent)" }}>
                  <span className="text-xs font-semibold uppercase tracking-widest mb-1 block" style={{ color: "#a78bfa" }}>
                    {item.category}
                  </span>
                  <p className="text-white font-bold text-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MULTI-STEP BOOKING FORM ──────────────────────────────────────────── */}
      <section id="booking" className="py-28 px-6"
        style={{ background: "linear-gradient(180deg, transparent, rgba(46,16,101,0.2), transparent)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#93c5fd" }}>Get Started</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Request Your Appointment</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Takes less than 2 minutes. No commitment required.
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-3xl border overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(167,139,250,0.2)",
              backdropFilter: "blur(16px)",
            }}>

            {!submitted ? (
              <>
                {/* Step indicator */}
                <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
                  <div className="flex items-center justify-between">
                    {[
                      { n: 1, label: "Service" },
                      { n: 2, label: "Schedule" },
                      { n: 3, label: "Contact" },
                    ].map(({ n, label }, idx) => (
                      <div key={n} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            step > n
                              ? "bg-green-500 text-white"
                              : step === n
                              ? "text-white"
                              : "text-slate-500 border border-slate-700"
                          }`}
                            style={step === n ? { background: "linear-gradient(135deg,#7c3aed,#3b82f6)" } : {}}>
                            {step > n ? <CheckIcon /> : n}
                          </div>
                          <span className={`text-xs mt-2 font-medium ${step >= n ? "text-white" : "text-slate-600"}`}>{label}</span>
                        </div>
                        {idx < 2 && (
                          <div className="flex-1 h-px mx-2 mb-5 transition-all"
                            style={{ background: step > n ? "#22c55e" : "rgba(167,139,250,0.2)" }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8">

                  {/* STEP 1 */}
                  {step === 1 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">What do you need help with?</h3>
                      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Select the service that best describes your situation.</p>
                      <div className="grid grid-cols-2 gap-3">
                        {serviceOptions.map((opt) => (
                          <button key={opt} type="button"
                            onClick={() => setFormData({ ...formData, service: opt })}
                            className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all border ${
                              formData.service === opt
                                ? "border-purple-500 text-white"
                                : "text-slate-400 hover:text-white hover:border-purple-700"
                            }`}
                            style={formData.service === opt
                              ? { background: "rgba(124,58,237,0.25)", borderColor: "#7c3aed" }
                              : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(167,139,250,0.15)" }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      <button type="button"
                        disabled={!formData.service}
                        onClick={() => setStep(2)}
                        className="w-full mt-8 py-4 rounded-xl font-bold text-white text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                        style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
                        Continue →
                      </button>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">When do you need service?</h3>
                      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Choose your preferred date and arrival window.</p>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Date</label>
                          <input type="date"
                            value={formData.date}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all border"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              borderColor: "rgba(167,139,250,0.2)",
                              colorScheme: "dark",
                            }} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Arrival Window</label>
                          <select value={formData.timeWindow}
                            onChange={(e) => setFormData({ ...formData, timeWindow: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all border"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              borderColor: "rgba(167,139,250,0.2)",
                              colorScheme: "dark",
                            }}>
                            <option value="">Select a time window...</option>
                            {timeWindows.map((tw) => (
                              <option key={tw} value={tw}>{tw}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-8">
                        <button type="button" onClick={() => setStep(1)}
                          className="flex-1 py-4 rounded-xl font-semibold text-slate-400 transition-all hover:text-white border"
                          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(167,139,250,0.15)" }}>
                          ← Back
                        </button>
                        <button type="button"
                          disabled={!formData.date || !formData.timeWindow}
                          onClick={() => setStep(3)}
                          className="flex-[2] py-4 rounded-xl font-bold text-white text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                          style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
                          Continue →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">How should we contact you?</h3>
                      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>We'll send a confirmation and reach out to confirm your appointment.</p>
                      <div className="space-y-4">
                        {[
                          { label: "Full Name", key: "fullName", type: "text", placeholder: "John Smith" },
                          { label: "Phone Number", key: "phone", type: "tel", placeholder: "(555) 000-0000" },
                          { label: "Email Address", key: "email", type: "email", placeholder: "john@example.com" },
                          { label: "Zip Code", key: "zipCode", type: "text", placeholder: "77001" },
                        ].map(({ label, key, type, placeholder }) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
                            <input type={type} placeholder={placeholder}
                              value={formData[key as keyof FormData]}
                              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:ring-2 focus:ring-purple-500 transition-all border"
                              style={{
                                background: "rgba(255,255,255,0.06)",
                                borderColor: "rgba(167,139,250,0.2)",
                              }} />
                          </div>
                        ))}
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Message <span className="text-slate-600">(optional)</span>
                          </label>
                          <textarea placeholder="Describe the issue, system age, or any other details that would help our technician..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:ring-2 focus:ring-purple-500 transition-all border resize-none"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              borderColor: "rgba(167,139,250,0.2)",
                            }} />
                        </div>
                      </div>
                      <div className="flex gap-3 mt-8">
                        <button type="button" onClick={() => setStep(2)}
                          className="flex-1 py-4 rounded-xl font-semibold text-slate-400 transition-all hover:text-white border"
                          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(167,139,250,0.15)" }}>
                          ← Back
                        </button>
                        <button type="submit"
                          disabled={!formData.fullName || !formData.phone || !formData.email || !formData.zipCode}
                          className="flex-[2] py-4 rounded-xl font-bold text-white text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                          style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
                          Request Appointment
                        </button>
                      </div>
                      <p className="text-xs text-center mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                        No payment required. We'll contact you to confirm within 1 business hour.
                      </p>
                    </div>
                  )}
                </form>
              </>
            ) : (
              /* ── SUCCESS STATE ── */
              <div className="p-12 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(34,197,94,0.15)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-white mb-3">Request Received!</h3>
                <p className="text-lg mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Thanks, <strong className="text-white">{formData.fullName.split(" ")[0]}</strong>. We've got your appointment request.
                </p>
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
                  A member of our team will call you at {formData.phone} within 1 business hour to confirm your appointment for <strong className="text-white">{formData.date}</strong>.
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border text-sm"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    borderColor: "rgba(167,139,250,0.2)",
                    color: "#a78bfa",
                  }}>
                  <PhoneIcon />
                  Questions? Call us: (407) 458-4032
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-3xl p-16 border relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(76,29,149,0.3), rgba(30,58,95,0.3))",
            borderColor: "rgba(167,139,250,0.2)",
          }}>
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#a78bfa" }}>Ready to Get Started?</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready for Fast, Professional<br />
              <span className="text-gradient">HVAC Service?</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
              Join thousands of homeowners who trust PurpleAir for all their heating and cooling needs. Your free estimate is just one click away.
            </p>
            <button onClick={scrollToForm}
              className="px-10 py-5 rounded-xl font-black text-white text-xl transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]"
              style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
              Book Your Free Estimate
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t py-16 px-6" style={{ borderColor: "rgba(167,139,250,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
                  <span className="text-white font-bold text-sm">PA</span>
                </div>
                <span className="font-bold text-white text-xl">PurpleAir<span className="text-gradient"> HVAC</span></span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Your trusted local HVAC professionals. We keep your home comfortable year-round with fast, reliable, and affordable service.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-5">Contact Us</h4>
              <div className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <a href="tel:+14074584032" className="hover:text-white transition-colors">(407) 458-4032</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <a href="mailto:service@purpleairhvac.com" className="hover:text-white transition-colors">service@purpleairhvac.com</a>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div>
              <h4 className="font-bold text-white mb-5">Service Area</h4>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Greater Metro Area including Houston, Dallas, Austin, and surrounding communities within a 50-mile radius.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  borderColor: "rgba(34,197,94,0.25)",
                  color: "#4ade80",
                }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Now Accepting New Customers
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ borderColor: "rgba(167,139,250,0.1)", color: "rgba(255,255,255,0.3)" }}>
            <p>© {new Date().getFullYear()} PurpleAir HVAC. All rights reserved.</p>
            <p>Licensed · Bonded · Insured | ROC #000000</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
