import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { CTA, Reveal, seo } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { ProjectEstimator } from "@/components/site/ProjectEstimator";
import { services, projects } from "@/lib/site";
import { serviceDetails } from "@/lib/service-details";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) =>
    seo(
      loaderData
        ? `${loaderData.service.title} — OMMCRE8 Studio`
        : "Service — OMMCRE8 Studio",
      loaderData?.service.text ?? "Explore OMMCRE8 Studio engineering & creative capabilities."
    ),
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-3xl font-semibold text-white">Service not found</h1>
      <Link to="/services" className="mt-4 inline-block text-[#C59B4B] underline">
        Back to all services
      </Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const detail = serviceDetails[s.slug] ?? {
    audience:
      "Businesses and founders who want specialist support with a clear brief, coordinated delivery, and an agreed outcome.",
    approach:
      "We begin with your goals, current assets and operating constraints. Together we define priorities, establish a review process and work through the agreed deliverables.",
    handover:
      "Deliverables, formats, review rounds and ongoing responsibilities are specified in your proposal. Any external costs or dependencies are discussed before work begins.",
  };

  const currentIndex = services.findIndex((item) => item.slug === s.slug);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <>
      {/* Top Breadcrumb & Return Bar */}
      <div className="container-x pt-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Button asChild variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
            <Link to="/services">
              <ArrowLeft size={14} className="mr-1.5" /> All Capabilities
            </Link>
          </Button>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] text-[#C59B4B]">
            <Sparkles size={11} />
            <span>DISCIPLINE: {s.group.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container-x pt-10 md:pt-16">
        <div className="max-w-4xl space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C59B4B] font-semibold">
            OMMCRE8 STUDIO / {s.slug.toUpperCase()}
          </span>

          <h1 className="animate-rise text-4xl font-bold tracking-tight text-white md:text-7xl font-sans">
            {s.title}
          </h1>

          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-slate-200">
            {s.text}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-[#C59B4B] text-[#08090B] hover:bg-[#D4A359] font-semibold text-xs">
              <Link to="/contact" search={{ service: s.slug }}>
                Commission This Service <ArrowUpRight size={14} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">
              <Link to="/book">
                Book Call with Om <ArrowUpRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4 Architectural Deliverable Cards */}
      <section className="container-x mt-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-white/10 bg-[#0D0F14] p-6 transition-all duration-300 hover:border-[#C59B4B]/60 hover:shadow-xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-neutral-300">
              <Layers size={13} className="text-[#C59B4B]" />
              <span>01 / FIT & AUDIENCE</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">Who It's For</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              {detail.audience}
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-[#0D0F14] p-6 transition-all duration-300 hover:border-[#C59B4B]/60 hover:shadow-xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-neutral-300">
              <Cpu size={13} className="text-[#C59B4B]" />
              <span>02 / METHODOLOGY</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">How We Approach It</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              {detail.approach}
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-[#0D0F14] p-6 transition-all duration-300 hover:border-[#C59B4B]/60 hover:shadow-xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-neutral-300">
              <ShieldCheck size={13} className="text-[#C59B4B]" />
              <span>03 / PRODUCTION HANDOVER</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">What You Receive</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              {detail.handover}
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-[#0D0F14] p-6 transition-all duration-300 hover:border-[#C59B4B]/60 hover:shadow-xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-neutral-300">
              <TrendingUp size={13} className="text-[#C59B4B]" />
              <span>04 / REAL OUTCOME</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">Commercial Impact</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              Engineered directly by founder Om Yadav for conversion clarity, sub-second speed, and scalable long-term performance.
            </p>
          </div>
        </div>
      </section>

      {/* Scope Checklist & Production Standards */}
      <section className="container-x mt-20">
        <div className="rounded-2xl border border-white/15 bg-[#0D0F14] p-8 md:p-12 shadow-2xl">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#C59B4B]">
                DELIVERABLE SPECIFICATIONS
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                What is included in this scope.
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                Every milestone is backed by detailed specifications agreed in your custom studio proposal before kickoff. Zero ambiguity, zero unexpected add-ons.
              </p>

              <div className="mt-8">
                <Button asChild className="bg-[#C59B4B] text-[#08090B] hover:bg-[#D4A359] font-semibold text-xs">
                  <Link to="/contact" search={{ service: s.slug }}>
                    Get Custom Proposal for {s.title} <ArrowUpRight size={14} />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/50 p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                Core Deliverable Items
              </h3>
              <ul className="space-y-3.5">
                {s.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-xs text-white">
                    <CheckCircle2 size={16} className="text-[#C59B4B] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Production Showcase */}
      <section className="container-x mt-20">
        <div className="rounded-2xl border border-white/10 bg-[#0A0C10] p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-xs text-[#C59B4B] uppercase tracking-wider">
                FLAGSHIP STUDIO PORTFOLIO
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white">
                See this craft applied across our client platforms
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Explore our full-stack web platforms, design systems, and viral cinema reels generating 992K+ views.
              </p>
            </div>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">
              <Link to="/work">
                Explore All Portfolio Case Studies <ArrowUpRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Project Estimator Embed */}
      <section className="container-x py-24">
        <ProjectEstimator />
      </section>

      {/* Sibling Service Footer Navigation */}
      <div className="container-x border-t border-white/10 pt-8 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            <Link to="/services">
              <ArrowLeft size={14} className="mr-1.5" /> All Services
            </Link>
          </Button>

          {nextService && (
            <Button asChild variant="ghost" size="sm" className="text-white hover:text-[#C59B4B]">
              <Link to="/services/$slug" params={{ slug: nextService.slug }}>
                Next Service: {nextService.title} <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <CTA />
    </>
  );
}
