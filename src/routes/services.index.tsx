import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Code2,
  Fingerprint,
  Film,
  TrendingUp,
  Check,
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, Reveal, SectionHead, seo } from "@/components/site/Shell";
import { ProjectEstimator } from "@/components/site/ProjectEstimator";
import { ServicesIllustration } from "@/components/site/Illustrations";
import { services } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo(
      "Capabilities & Services — OMMCRE8 Studio",
      "Full-stack digital engineering, brand strategy, cinema production, Hollywood video editing, and performance marketing led by Om Yadav."
    ),
  component: Services,
});

const flagshipPillars = [
  {
    badge: "ENGINEERING & ARCHITECTURE",
    icon: Code2,
    title: "Digital Engineering & Web Apps",
    bullets: [
      "Custom React, Next.js & TanStack web platforms",
      "High-speed edge caching & sub-second page loads",
      "Interactive booking funnels & lead pipelines",
      "Clean REST/GraphQL APIs with database encryption",
    ],
    cta: "Explore Engineering",
    slug: "web-development",
  },
  {
    badge: "BRAND IDENTITY & UX",
    icon: Fingerprint,
    title: "Brand Strategy & Visual Systems",
    bullets: [
      "Distinctive typography & design system tokens",
      "High-fidelity interactive UI/UX prototyping",
      "Omnichannel voice across web, mobile & social",
      "Conversion auditing & journey frictionless design",
    ],
    cta: "Explore Branding",
    slug: "branding",
  },
  {
    badge: "CINEMA & VIRAL REELS",
    icon: Film,
    title: "Film & Creative Video Production",
    bullets: [
      "Commercial brand films & documentary storytelling",
      "Viral 9:16 vertical reels & hooks (992K+ views)",
      "Hollywood DaVinci Resolve color grading suite",
      "Executive interview direction & in-chamber setups",
    ],
    cta: "Explore Production",
    slug: "video-production",
  },
  {
    badge: "PERFORMANCE & GROWTH",
    icon: TrendingUp,
    title: "Marketing Strategy & Social Growth",
    bullets: [
      "Data-backed Instagram organic growth strategy",
      "High-intent technical SEO & local court rankings",
      "Targeted client acquisition campaigns & funnels",
      "Real-time analytics dashboards & conversion KPIs",
    ],
    cta: "Explore Growth",
    slug: "digital-marketing",
  },
];

const disciplineGroups = [
  {
    name: "Build",
    tagline: "Software, web platforms, and custom digital infrastructure.",
    categorySlug: "web-development",
  },
  {
    name: "Design",
    tagline: "Brand identities, interactive UI/UX, and distinctive design systems.",
    categorySlug: "branding",
  },
  {
    name: "Produce",
    tagline: "Cinematography, 4K narrative editing, sound design, and viral short-form reels.",
    categorySlug: "video-production",
  },
  {
    name: "Grow",
    tagline: "Organic social reach, technical SEO, and conversion optimization.",
    categorySlug: "digital-marketing",
  },
];

function Services() {
  return (
    <>
      {/* Hero Header with Vector Illustration */}
      <section className="mt-3 border-b border-white/10">
        <div className="container-x pt-14 pb-12 md:pt-20 md:pb-16">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-[#C59B4B]">
                <Sparkles size={12} />
                <span>OMMCRE8 STUDIO / CAPABILITIES & CRAFT</span>
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-medium tracking-tight text-white md:text-6xl font-sans">
                More than a website.<br />
                <span className="text-[#C59B4B]">A complete studio.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-200">
                Digital engineering, brand strategy, cinema production, narrative editing, and performance marketing. Choose a single discipline or commission an end-to-end studio partnership led by Om Yadav.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#C59B4B] text-[#08090B] hover:bg-[#D4A359] font-semibold text-xs">
                  <Link to="/contact">
                    Start a Project Brief <ArrowUpRight size={14} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">
                  <Link to="/book">
                    Book Call with Om <ArrowUpRight size={14} />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Accenture-style Full-Stack Vector Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#9333EA]/15 blur-[90px]" />
              <div className="relative z-10 w-full">
                <ServicesIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Flagship Pillars (Matching Image 2 Card Architecture) */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#C59B4B] font-semibold">
              CORE DISCIPLINES
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl font-sans">
              Specialist craft,<br />
              unified execution
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#C59B4B] hover:text-white transition-colors"
          >
            <span>COMMISSION A DISCIPLINE</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flagshipPillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.slug}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0D0F14] p-6 transition-all duration-300 hover:border-[#C59B4B]/60 hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
              >
                <div className="space-y-4">
                  {/* Top Badge with Icon */}
                  <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-mono font-medium text-neutral-300">
                    <Icon size={13} className="text-[#C59B4B]" />
                    <span>{p.badge}</span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#C59B4B] transition-colors leading-snug">
                    {p.title}
                  </h3>

                  {/* Bullets */}
                  <ul className="space-y-2 text-xs text-slate-200 pt-2">
                    {p.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#C59B4B] font-bold">•</span>
                        <span className="text-slate-100">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono pt-2">
                    <span>Hover to expand details</span>
                    <ChevronRight size={12} />
                  </div>
                </div>

                {/* Bottom Gold Button matching Image 2 */}
                <div className="pt-6">
                  <Button asChild className="w-full justify-between rounded-xl bg-[#C59B4B] px-4 py-2.5 text-xs font-semibold text-[#08090B] transition-all duration-200 hover:bg-[#D4A359]">
                    <Link to="/services/$slug" params={{ slug: p.slug }}>
                      <span>{p.cta}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categorized Detailed Services Directory */}
      <section className="border-t border-white/10 bg-[#0A0C10] py-20">
        <div className="container-x space-y-20">
          {disciplineGroups.map((group) => {
            const groupServices = services.filter((s) => s.group === group.name);
            return (
              <div key={group.name} className="space-y-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#C59B4B]">
                      DISCIPLINE CLUSTER
                    </span>
                    <h2 className="mt-1 text-3xl font-bold text-white md:text-4xl">{group.name}</h2>
                    <p className="mt-2 text-sm text-slate-300">{group.tagline}</p>
                  </div>
                  <Link
                    to="/services/$slug"
                    params={{ slug: group.categorySlug }}
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#C59B4B] hover:underline"
                  >
                    <span>View Primary Service</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {groupServices.map((s) => (
                    <Reveal key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="group flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#0F1218] p-6 transition-all duration-300 hover:border-[#C59B4B]/50 hover:bg-[#141824]"
                      >
                        <div>
                          <div className="font-mono text-[10px] uppercase text-[#C59B4B]">
                            {s.group} / {s.slug}
                          </div>
                          <h3 className="mt-3 text-lg font-bold text-white group-hover:text-[#C59B4B] transition-colors">
                            {s.title}
                          </h3>
                          <p className="mt-3 text-xs leading-relaxed text-slate-300">
                            {s.text}
                          </p>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                          <p className="text-[11px] text-neutral-400 font-mono">
                            {s.points.slice(0, 2).join(" · ")}
                          </p>
                          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-white group-hover:text-[#C59B4B]">
                            <span>Explore Deliverables</span>
                            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Project Budget & Scope Estimator */}
      <section className="container-x py-24">
        <ProjectEstimator />
      </section>

      <CTA />
    </>
  );
}
