import { Link } from "@tanstack/react-router";
import {
  Scale,
  Cpu,
  Heart,
  FileText,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export function TrueLegalCards() {
  const cards = [
    {
      id: "advocacy",
      badge: "ADVOCATE PROFILE & CREDENTIALS",
      icon: Scale,
      title: "High Court & District Court Legal Advocacy",
      text: "Adv. Shareen Hussain (B.Com, M.Com, LL.B) — Registered Trade Mark Attorney and High Court Advocate delivering ethical, strategic representation across Nagpur High Court and District Courts.",
      cta: "View Full Profile",
      url: "https://trulegaladvice.com/",
    },
    {
      id: "trademark",
      badge: "TRADEMARK & CORPORATE IP",
      icon: Cpu,
      title: "Trademark & Intellectual Property Rights",
      bullets: [
        "Trademark (™/®) Search, Filing & Objections",
        "Copyright Registration for logos & creative assets",
        "Pvt Ltd, LLP & One Person Company Setup",
        "MSME (Udyam) & GUMASTA / Shop Act License",
      ],
      cta: "Explore IP Services",
      url: "https://trulegaladvice.com/",
    },
    {
      id: "marriage",
      badge: "COURT & LOVE MARRIAGE",
      icon: Heart,
      title: "Court Marriage & Legal Registration",
      text: "Step-by-step lawful registration under the Special Marriage Act 1954 and Hindu Marriage Act 1955 with complete privacy, verified documentation, and confidential legal witness counsel.",
      cta: "Court Marriage Guide",
      url: "https://trulegaladvice.com/",
    },
    {
      id: "chamber",
      badge: "CHAMBER PRACTICE & SCHEDULE",
      icon: FileText,
      title: "Daily Walk-In Desk & Court Documentation",
      text: "Structured walk-in desk for property due diligence, sale deeds, registered wills, bail applications, consumer disputes, and active High Court litigation drafting.",
      cta: "Chamber Directions",
      url: "https://trulegaladvice.com/",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      {/* Section Header matching Image 2 */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#C59B4B] font-semibold">
            PLATFORM ARCHITECTURE & PRACTICE TAXONOMY
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl font-sans">
            Strategic legal counsel,<br />
            decisive execution
          </h2>
          <p className="mt-3 max-w-2xl text-xs md:text-sm text-neutral-400 leading-relaxed">
            Official chamber notices, authorized mandates, and strategic legal advisory across Nagpur High Court and District Courts. Engineered by OMMCRE8 Studio.
          </p>
        </div>

        <a
          href="https://trulegaladvice.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#C59B4B] hover:text-white transition-colors"
        >
          <span>VIEW ALL PRACTICE AREAS & CREDENTIALS</span>
          <ArrowUpRight size={14} />
        </a>
      </div>

      {/* 4 Cards Grid matching Image 2 */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0D0F14] p-6 transition-all duration-300 hover:border-[#C59B4B]/60 hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            >
              <div className="space-y-4">
                {/* Top Badge with Icon */}
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-mono font-medium text-neutral-300">
                  <Icon size={13} className="text-[#C59B4B]" />
                  <span>{c.badge}</span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-medium tracking-tight text-white group-hover:text-[#C59B4B] transition-colors leading-snug">
                  {c.title}
                </h3>

                {/* Bullets or Text */}
                {c.bullets ? (
                  <ul className="space-y-2 text-xs text-neutral-400 pt-2">
                    {c.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#C59B4B] font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                    {c.text}
                  </p>
                )}

                <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono pt-2">
                  <span>Hover to expand details</span>
                  <ChevronRight size={12} />
                </div>
              </div>

              {/* Bottom Gold Button matching Image 2 */}
              <div className="pt-6">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-between rounded-xl bg-[#C59B4B] px-4 py-2.5 text-xs font-semibold text-[#08090B] transition-all duration-200 hover:bg-[#D4A359] hover:shadow-lg"
                >
                  <span>{c.cta}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
