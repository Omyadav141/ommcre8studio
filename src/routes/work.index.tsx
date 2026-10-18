import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, Reveal, SectionHead, seo } from "@/components/site/Shell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ReelsShowcase } from "@/components/site/ReelsShowcase";
import { projects } from "@/lib/site";

export const Route = createFileRoute("/work/")({
  head: () =>
    seo(
      "Work & Flagship Productions — OMCRE8 Studio",
      "Explore the True Legal Advice platform, cinema showreels, high-fashion e-commerce, and software systems from OMCRE8 Studio."
    ),
  component: Work,
});

function Work() {
  return (
    <>
      <section className="container-x pt-12 md:pt-20">
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link to="/">
            <ArrowLeft /> Home
          </Link>
        </Button>
        <p className="eyebrow">Portfolio / Digital Experiences & Cinema</p>
        <h1 className="mt-5 text-4xl font-medium md:text-6xl">
          Engineered with precision.<br />
          <span className="text-muted-foreground">Directed with purpose.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          From authoritative legal advice platforms to editorial commerce and cinema productions. Explore our public references, client platforms, and concept studies.
        </p>

        {/* Platforms Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Reveal key={p.slug}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* Reels & Short-Form Video Production Showcase */}
        <div className="mt-20 border-t pt-10">
          <ReelsShowcase />
        </div>
      </section>
      <CTA />
    </>
  );
}
