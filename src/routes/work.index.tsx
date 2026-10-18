import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, Reveal, SectionHead, seo } from "@/components/site/Shell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ReelsShowcase } from "@/components/site/ReelsShowcase";
import { WorkIllustration } from "@/components/site/Illustrations";
import { projects } from "@/lib/site";

export const Route = createFileRoute("/work/")({
  head: () =>
    seo(
      "Work & Flagship Productions — OMCRE8 Studio",
      "Explore digital engineering platforms, cinema showreels, high-fashion e-commerce, and bespoke software systems from OMCRE8 Studio."
    ),
  component: Work,
});

function Work() {
  return (
    <>
      <section className="container-x pt-12 md:pt-20">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/">
            <ArrowLeft /> Home
          </Link>
        </Button>

        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Portfolio / Digital Experiences & Cinema</p>
            <h1 className="mt-4 text-4xl font-medium md:text-6xl">
              Engineered with precision.<br />
              <span className="text-muted-foreground">Directed with purpose.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              From authoritative legal advice platforms to editorial commerce and cinema productions. Explore our public references, client platforms, and concept studies.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#9333EA]/15 blur-[90px]" />
            <div className="relative z-10 w-full">
              <WorkIllustration />
            </div>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Reveal key={p.slug}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Standalone Reels Showcase (Edge-to-edge, freely floating) */}
      <ReelsShowcase />

      <CTA />
    </>
  );
}
