import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Aperture,
  Fingerprint,
  TrendingUp,
  Sparkles,
  Quote,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, Reveal, SectionHead, seo } from "@/components/site/Shell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectEstimator } from "@/components/site/ProjectEstimator";
import { ReelsShowcase } from "@/components/site/ReelsShowcase";
import { HeroIllustration } from "@/components/site/Illustrations";
import { projects, studio, testimonials } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "OMCRE8 Studio — Digital Engineering & Creative Production",
      "OMCRE8 Studio brings high-craft web development, custom software, brand design, film production, and growth together. Founded by Om Yadav."
    ),
  component: Index,
});

const capabilities = [
  {
    n: "01",
    badge: "ENGINEERING & PLATFORMS",
    title: "Digital Engineering & Architecture",
    bullets: [
      "Custom React, Next.js & TanStack web applications",
      "Robust REST APIs with high edge cache concurrency",
      "Sub-second load times & WCAG AA accessibility",
      "Custom e-commerce funnels & payment gateways",
    ],
    cta: "Explore Engineering",
    icon: Code2,
    slug: "web-development",
  },
  {
    n: "02",
    badge: "BRAND IDENTITY & UX",
    title: "Brand Strategy & Visual Systems",
    bullets: [
      "Distinctive typography & design system guidelines",
      "High-fidelity interactive UI/UX prototyping",
      "Omnichannel voice and design token cohesion",
      "Conversion-focused customer journey auditing",
    ],
    cta: "Explore Branding",
    icon: Fingerprint,
    slug: "branding",
  },
  {
    n: "03",
    badge: "CINEMA & VIRAL REELS",
    title: "Film & Creative Video Production",
    bullets: [
      "Brand documentary films & commercial treatments",
      "Viral 9:16 vertical reels & hooks (992K+ & 178K+)",
      "Hollywood DaVinci Resolve color grading & sound suite",
      "Executive interview direction & in-chamber setups",
    ],
    cta: "Explore Production",
    icon: Aperture,
    slug: "video-production",
  },
  {
    n: "04",
    badge: "PERFORMANCE & GROWTH",
    title: "Marketing Strategy & Audience Growth",
    bullets: [
      "Data-backed social media growth & viral distribution",
      "High-intent technical SEO & local search ranking",
      "Paid acquisition campaign funnels & retargeting",
      "Custom analytics dashboards & KPI conversion tracking",
    ],
    cta: "Explore Growth",
    icon: TrendingUp,
    slug: "digital-marketing",
  },
];

function Index() {
  const trueLegal = projects.find((p) => p.slug === "true-legal-advice") ?? projects[0]!;

  return (
    <>
      {/* Hero Section with Accenture-style Vector Illustration */}
      <section className="relative isolate mt-3 overflow-hidden border-b">
        <div className="container-x pt-14 pb-12 md:pt-20 md:pb-16">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px w-8 bg-primary" />
                <span>OMCRE8 STUDIO / INDEPENDENT DIGITAL & CINEMA</span>
              </div>

              <h1 className="editorial-title animate-rise max-w-2xl font-medium tracking-tight">
                Ideas to Digital<br className="hidden md:block" /> Products.<br />
                <span className="text-muted-foreground">Built to Scale.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Strategy, design, code, and cinema. We engineer resilient digital platforms and craft the cinematic stories that drive measurable growth.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Start Your Project <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass">
                  <Link to="/work">
                    Explore Our Work <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link to="/book">
                    Book Call with Om <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: High-Craft Accenture-style Vector Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Subtle ambient violet radial glow */}
              <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#9333EA]/15 blur-[100px]" />
              <div className="relative z-10 w-full">
                <HeroIllustration />
              </div>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-foreground/15 pt-6 text-xs text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Independent multidisciplinary practice directed by Om Yadav.</p>
              <p className="mt-1">Hands-on technology architecture, UI/UX, cinema production, and viral growth.</p>
            </div>
            <div className="flex items-center gap-6">
              <span>✦ Sub-second Performance</span>
              <span>✦ WCAG AA Compliant</span>
              <span>✦ Full-stack & Cinema</span>
            </div>
            <ArrowDown size={18} className="text-muted-foreground hidden sm:block" />
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="overflow-hidden border-b py-5">
        <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-12 text-sm text-muted-foreground">
          {Array.from({ length: 2 }, (_, i) =>
            [
              "Digital Engineering",
              "Brand Strategy",
              "Cinematography",
              "True Legal Advice",
              "E-commerce & D2C",
              "Custom AI Workflows",
              "Video Editing & Color",
              "Performance Marketing",
            ].map((t) => (
              <span key={`${i}-${t}`} className="flex items-center gap-12 font-mono text-xs">
                {t}
                <span className="text-foreground">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Capabilities Section */}
      <section className="container-x py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <SectionHead
            eyebrow="A studio without silos"
            title="Engineered together. Better together."
          />
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A business doesn't stop at its code. Neither do we. OMCRE8 Studio unites software engineering, brand identity, creative cinema production, and performance marketing into one coordinated conversation led by founder {studio.founder}.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link to="/about" className="inline-flex items-center gap-2 hover:text-primary">
                Meet Om Yadav & the Studio <ArrowUpRight size={16} />
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link to="/founder" className="inline-flex items-center gap-2 hover:text-primary">
                Om Yadav's philosophy <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.n}
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

                  {/* Bullets */}
                  <ul className="space-y-2 text-xs text-neutral-400 pt-2">
                    {c.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#C59B4B] font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono pt-2">
                    <span>Hover to expand details</span>
                    <ChevronRight size={12} />
                  </div>
                </div>

                {/* Bottom Gold Button matching Image 2 */}
                <div className="pt-6">
                  <Button asChild className="w-full justify-between rounded-xl bg-[#C59B4B] px-4 py-2.5 text-xs font-semibold text-[#08090B] transition-all duration-200 hover:bg-[#D4A359]">
                    <Link to="/services/$slug" params={{ slug: c.slug }}>
                      <span>{c.cta}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Case Study Spotlight: True Legal Advice */}
      <section className="border-y bg-card/60 py-20">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Flagship Case Study"
              title="True Legal Advice (trulegaladvice.com)"
              text="How OMCRE8 Studio transformed legal advisory discovery into an accessible, high-converting digital platform."
            />
            <Button asChild variant="outline">
              <Link to="/work/$slug" params={{ slug: "true-legal-advice" }}>
                Full Case Study <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <div className="grid items-center gap-8 rounded-2xl border border-primary/20 bg-ink/80 p-8 shadow-xl lg:grid-cols-12">
            <div className="lg:col-span-7 overflow-hidden rounded-xl border border-border/80">
              <img
                src={trueLegal.image}
                alt={trueLegal.name}
                className="aspect-[16/10] w-full object-cover object-top hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs text-primary uppercase">Production Deliverable</span>
                <h3 className="mt-1 text-2xl font-medium text-foreground">
                  Streamlined Legal Discovery & Consultation Funnel
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  We engineered an accessible, high-speed legal portal structuring complex practice areas, automated appointment bookings, and privacy-first enquiry encryption.
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-4">
                <div>
                  <div className="text-2xl font-bold text-foreground">&lt; 0.8s</div>
                  <div className="text-xs text-muted-foreground">Page Load Speed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">+44%</div>
                  <div className="text-xs text-muted-foreground">Consultation Bookings</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {trueLegal.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border/80 bg-secondary/50 px-3 py-1 text-xs">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Button asChild size="sm">
                  <a href={trueLegal.url} target="_blank" rel="noreferrer">
                    Visit trulegaladvice.com <ArrowUpRight />
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Link to="/work/$slug" params={{ slug: "true-legal-advice" }}>
                    Case Study Breakdown
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standalone Viral Client Reels Showcase (Unboxed, freely flowing) */}
      <ReelsShowcase />

      {/* Work & Concepts Grid */}
      <section className="border-b bg-ink py-20">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Work & concepts" title="Small details. Bigger possibilities." />
            <Link to="/work" className="inline-flex items-center gap-2 text-sm text-primary">
              View all work <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Cost Estimator */}
      <section className="container-x py-24">
        <ProjectEstimator />
      </section>

      {/* Film & Creative Production Banner */}
      <section className="border-y bg-ink py-24">
        <div className="container-x">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Film & creative production</p>
              <h2 className="mt-4 text-4xl font-medium md:text-5xl">
                Every frame.<br />
                With intention.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                Brand films, product cinema, founder interviews, and high-cadence social reels. We shape the script, direct the shoot, and bring the narrative together in DaVinci Resolve color, sound design, and bespoke platform formats.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/production">
                    Explore Production <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact" search={{ service: "video-production" }}>
                    Commission a Film
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal className="border-l border-border/80 pl-8">
              <p className="eyebrow">From concept to delivery</p>
              {[
                ["Pre-production", "Creative treatment, narrative script, shot list, and gear planning."],
                ["Production", "Direction, cinematography, anamorphic lighting, and high-fidelity audio capture."],
                ["Post-production", "Narrative editing, DaVinci Resolve color grading, custom sound design, and social cuts."],
              ].map(([t, d], i) => (
                <div key={t} className="border-b border-border/60 py-7 last:border-0">
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-medium text-foreground">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials & Social Proof */}
      <section className="container-x py-24">
        <SectionHead eyebrow="Client Perspectives" title="Trusted by founders, counsel & builders." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Reveal key={idx}>
              <div className="glass-card flex h-full flex-col justify-between rounded-xl p-8 shadow-sm">
                <div>
                  <Quote size={24} className="text-primary/60" />
                  <p className="mt-4 text-sm leading-relaxed text-foreground italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-8 border-t border-border/60 pt-4">
                  <div className="font-medium text-foreground">{t.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-primary">{t.project}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The Way We Work (Process) */}
      <section className="border-y py-20">
        <div className="container-x">
          <SectionHead eyebrow="The way we work" title="Clarity at every stage." />
          <ol className="mt-12 grid gap-8 md:grid-cols-5">
            {[
              ["Discover", "Understand the business, audience and ambition."],
              ["Define", "Agree scope, deliverables, budget and timing."],
              ["Create", "Design, develop or produce with regular reviews."],
              ["Refine", "Test, review and resolve the details."],
              ["Launch", "Deliver, document and agree ongoing support."],
            ].map(([t, d], i) => (
              <li key={t} className="border-t pt-5">
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <h3 className="mt-6 font-medium text-foreground">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex gap-4">
            <Link to="/process" className="inline-flex items-center gap-2 text-sm text-primary">
              Read our full process <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
