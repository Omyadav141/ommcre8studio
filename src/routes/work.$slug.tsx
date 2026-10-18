import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CTA } from "@/components/site/Shell";
import { projects } from "@/lib/site";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Image as ImageIcon,
  X,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrueLegalCards } from "@/components/site/TrueLegalCards";
import { ReelsShowcase } from "@/components/site/ReelsShowcase";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p
      ? `${p.name} — ${p.draft ? "Design Concept" : "Flagship Platform"} | OMCRE8 Studio`
      : "Project not found — OMCRE8 Studio";
    const d = p?.description ?? "Public website reference";
    return {
      meta: [
        { title },
        { name: "description", content: d },
        { property: "og:title", content: title },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-3xl font-semibold">Project not found</h1>
      <Link to="/work" className="mt-4 inline-block underline">
        Back to work
      </Link>
    </div>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const cs = p.caseStudy;
  const next = projects[(projects.findIndex((project) => project.slug === p.slug) + 1) % projects.length];

  return (
    <>
      <article className="container-x pt-10 md:pt-16">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b pb-5">
          <Button asChild variant="outline" size="sm">
            <Link to="/work">
              <ArrowLeft /> Back to Work
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            {p.url && (
              <Button asChild size="sm">
                <a href={p.url} target="_blank" rel="noreferrer">
                  Visit Live Site <ArrowUpRight />
                </a>
              </Button>
            )}
            <Button asChild variant="ghost" size="icon">
              <Link to="/work" aria-label="Close project" title="Close project">
                <X />
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-primary">
              {p.category}
            </span>
            {p.draft ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                Concept Exploration
              </span>
            ) : (
              <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                Production Release
              </span>
            )}
          </div>

          <h1 className="animate-rise mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {p.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            {p.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-border/80 bg-secondary/40 px-3 py-1 text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Media Preview & Intro */}
        <div className="mt-10 grid items-start gap-8 md:grid-cols-[1.25fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-secondary shadow-lg">
            {p.image ? (
              <img
                src={p.image}
                alt={p.imageAlt ?? `${p.name} preview`}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            ) : (
              <div className="flex aspect-[16/10] max-h-80 flex-col items-center justify-center gap-3 text-muted-foreground">
                <ImageIcon size={32} strokeWidth={1} aria-hidden="true" />
                <p className="text-sm">Project preview pending</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border/80 bg-card/60 p-6">
              <h2 className="text-xl font-medium">
                {p.draft ? "Design & Architecture Direction" : "Project Overview"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.draft
                  ? "A rigorous concept study exploring user journey friction, visual branding, and technical scalability within this vertical."
                  : "A full multidisciplinary production engineered by OMCRE8 Studio: spanning responsive architecture, brand messaging, custom booking funnels, and search indexing."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link to="/contact" search={{ service: p.slug }}>
                    Scope Similar Project <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/book">Talk with Om</Link>
                </Button>
              </div>
            </div>

            {/* Key Metrics / Highlights */}
            {cs?.metrics && cs.metrics.length > 0 && (
              <div className="rounded-xl border border-primary/20 bg-ink/70 p-6">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                  <TrendingUp size={14} /> Performance Outcomes
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx} className="border-t border-border/60 pt-3">
                      <div className="text-2xl font-bold text-foreground">{m.value}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Case Study Deep Dive */}
        {cs && (
          <div className="mt-16 space-y-12 border-t pt-12">
            <div className="grid gap-10 md:grid-cols-3">
              <section className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">01 / The Context</p>
                <h3 className="text-xl font-medium">Background</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cs.background}</p>
              </section>

              <section className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">02 / The Challenge</p>
                <h3 className="text-xl font-medium">The Problem</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cs.problem}</p>
              </section>

              <section className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">03 / The Execution</p>
                <h3 className="text-xl font-medium">Our Solution</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cs.solution}</p>
              </section>
            </div>

            {/* Deliverables & Tech Stack */}
            <div className="grid gap-8 rounded-xl border border-border/80 bg-ink/50 p-8 md:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                  <Layers size={14} /> Production Deliverables
                </p>
                <ul className="mt-5 space-y-3">
                  {cs.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {cs.techStack && (
                <div className="border-t border-border/60 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                    <Cpu size={14} /> Technology Architecture
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Modern performant stack chosen for high resilience, edge caching, and zero database read leakage.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cs.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-border/70 bg-card px-3 py-1.5 font-mono text-xs text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {p.slug === "true-legal-advice" && (
          <div className="mt-16 space-y-16 border-t border-white/10 pt-12">
            <TrueLegalCards />
            <ReelsShowcase />
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <Button asChild variant="outline">
            <Link to="/work">
              <ArrowLeft /> All Projects & References
            </Link>
          </Button>
          {next && (
            <Button asChild variant="ghost">
              <Link to="/work/$slug" params={{ slug: next.slug }}>
                Next: {next.name} <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </article>
      <CTA />
    </>
  );
}
