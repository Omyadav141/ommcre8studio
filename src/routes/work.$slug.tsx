import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CTA } from "@/components/site/Shell";
import { projects } from "@/lib/site";
import { ArrowLeft, ArrowRight, ArrowUpRight, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — ${p.draft ? "Design Concept" : "Website Reference"} | OMCRE8 Studio` : "Project not found — OMCRE8 Studio";
    const d = p?.description ?? "Public website reference";
    return { meta: [{ title }, { name: "description", content: d }, { property: "og:title", content: title }, { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center"><h1 className="text-3xl font-semibold">Project not found</h1><Link to="/work" className="mt-4 inline-block underline">Back to work</Link></div>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const cs = p.caseStudy;
  const next = projects[(projects.findIndex(project => project.slug === p.slug) + 1) % projects.length];
  return (
    <>
      <article className="container-x pt-10 md:pt-16">
        <div className="flex items-center justify-between border-b pb-5"><Button asChild variant="outline"><Link to="/work"><ArrowLeft /> Back to Work</Link></Button><Button asChild variant="ghost" size="icon"><Link to="/work" aria-label="Close project" title="Close project"><X /></Link></Button></div>
        <p className="eyebrow mt-10">{p.category}</p>
        <h1 className="animate-rise mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{p.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{p.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => <span key={t} className="rounded-full border px-3 py-1 text-xs">{t}</span>)}
        </div>
        {p.url && <Button asChild className="mt-7"><a href={p.url} target="_blank" rel="noreferrer">Visit trulegaladvice.com <ArrowUpRight /></a></Button>}
        <div className="mt-10 grid items-start gap-8 md:grid-cols-[1.15fr_1fr]"><div className="overflow-hidden rounded-lg border bg-secondary">{p.image ? <img src={p.image} alt={p.imageAlt ?? `${p.name} preview`} width={640} height={400} className="aspect-[16/10] max-h-80 w-full object-cover object-top" /> : <div className="flex aspect-[16/10] max-h-80 flex-col items-center justify-center gap-3 text-muted-foreground"><Image size={32} strokeWidth={1} aria-hidden="true" /><p className="text-sm">Project preview pending</p></div>}</div><div><h2 className="text-xl font-medium">{p.draft ? "The design direction" : "About this reference"}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.draft ? "A concept exploring the category, not a completed client project. Authentic screenshots, the brand name, live website and delivery details have not been supplied." : "This screenshot documents trulegaladvice.com, the supplied public website reference. Studio authorship, scope and results are awaiting confirmation; this is not a verified studio case study."}</p><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.slug === "fashion-commerce" ? "The focus is on collection discovery, readable product details and a straightforward path from browsing to checkout." : p.slug === "trademark-platform" ? "The focus is on clear service navigation, approachable information and structured contact enquiries. No legal or trademark advice is provided by the studio." : "The reference centres on legal services, clear content organisation and a direct path to contact."}</p></div></div>
        {cs && (
          <div className="mt-16 grid gap-10 border-t pt-10 md:grid-cols-2">
            {([["Background", cs.background], ["The problem", cs.problem], ["Our solution", cs.solution]] as const).map(([h, t]) => (
              <section key={h}><p className="eyebrow">{h}</p><p className="mt-3">{t}</p></section>
            ))}
            <section><p className="eyebrow">Deliverables</p><ul className="mt-3 space-y-1">{cs.deliverables.map((d) => <li key={d}>— {d}</li>)}</ul></section>
          </div>
        )}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6"><Button asChild variant="outline"><Link to="/work"><ArrowLeft /> All projects</Link></Button>{next && <Button asChild variant="ghost"><Link to="/work/$slug" params={{slug:next.slug}}>Next: {next.name} <ArrowRight /></Link></Button>}</div>
      </article>
      <CTA />
    </>
  );
}
