import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, Reveal, seo } from "@/components/site/Shell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/lib/site";
export const Route = createFileRoute("/work/")({ head: () => seo("Work & Design Concepts — OMCRE8 Studio", "Explore a legal website reference, fashion e-commerce and a professional-services design concept from OMCRE8 Studio."), component: Work });
function Work() { return <><section className="container-x pt-12 md:pt-20"><Button asChild variant="ghost" size="sm" className="mb-8"><Link to="/"><ArrowLeft /> Home</Link></Button><p className="eyebrow">Work / Digital experiences</p><h1 className="mt-5 text-4xl font-medium md:text-6xl">Thoughtful by design.</h1><p className="mt-6 max-w-2xl text-lg text-muted-foreground">From service-led websites to considered shopping experiences. Explore the supplied website reference and two concept studies.</p><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{projects.map(p => <Reveal key={p.slug}><ProjectCard p={p} /></Reveal>)}</div><p className="mt-8 max-w-2xl text-sm text-muted-foreground">Fashion and trademark entries are concepts, not verified client deliveries. Authentic screenshots, client names, live links and studio credits are awaiting confirmation.</p></section><CTA /></>; }
