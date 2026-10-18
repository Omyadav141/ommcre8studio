import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Aperture,
  Clapperboard,
  AudioLines,
  Film,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, Reveal, SectionHead, seo } from "@/components/site/Shell";
import { ReelsShowcase } from "@/components/site/ReelsShowcase";

export const Route = createFileRoute("/production")({
  head: () =>
    seo(
      "Film & Creative Production — OMMCRE8 Studio",
      "Brand films, viral social reels, cinematography, DaVinci colour grading, and motion graphics engineered for high-retention engagement."
    ),
  component: Production,
});

const formats = [
  {
    badge: "FILM DIRECTION & CINEMATOGRAPHY",
    icon: Film,
    title: "Brand & Product Films",
    bullets: [
      "Brand stories & visual manifestos",
      "Cinematography & high-dynamic range capture",
      "Multi-platform aspect ratios (16:9 & 9:16)",
      "Product launches & narrative commercial films",
    ],
    cta: "Explore Brand Films",
    serviceSlug: "video-production",
  },
  {
    badge: "SHORT FORM & SOCIAL VIRALITY",
    icon: Clapperboard,
    title: "Viral Social & Campaign Content",
    bullets: [
      "Vertical 9:16 framing & high-retention hooks",
      "Algorithmic pacing & kinetic caption styling",
      "Instagram Reels & YouTube Shorts mastery",
      "Multi-million view case studies (992K+ & 178K+)",
    ],
    cta: "Explore Viral Formats",
    serviceSlug: "video-production",
  },
  {
    badge: "EXECUTIVE & FOUNDER PROFILES",
    icon: Aperture,
    title: "Interviews & Corporate Profiles",
    bullets: [
      "In-chamber & private studio lighting direction",
      "Dual-channel studio audio recording",
      "Leadership voice & investor presentations",
      "Natural, unscripted conversational direction",
    ],
    cta: "View Interview Formats",
    serviceSlug: "video-production",
  },
  {
    badge: "POST-PRODUCTION & COLOR GRADING",
    icon: AudioLines,
    title: "Narrative Editing & Color Suite",
    bullets: [
      "Hollywood DaVinci Resolve color grading",
      "Bespoke sound design, sonic mix & licensing",
      "Kinetic motion graphics & title sequences",
      "Master exports in 4K ProRes & web delivery",
    ],
    cta: "Explore Post-Production",
    serviceSlug: "video-editing",
  },
];

function Production() {
  return (
    <>
      {/* Hero Header */}
      <section className="mt-3 border-b border-white/10">
        <div className="container-x pt-16 pb-12 md:pt-24">
          <p className="eyebrow text-[#C59B4B]">OMMCRE8 STUDIO / Film & production</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-medium tracking-tight text-white md:text-7xl font-sans">
            Film & creative<br />
            <span className="text-[#C59B4B]">production.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-neutral-400">
            The idea. The shoot. The final cut. We craft high-retention visual stories for brands, leaders, and fast-growing practices — with relentless purpose behind every frame.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[#C59B4B] text-[#08090B] hover:bg-[#D4A359] font-semibold">
              <Link to="/contact" search={{ service: "video-production" }}>
                Discuss a production <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link to="/book">
                Book a call <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <p className="mt-12 border-t border-white/10 pt-5 text-xs font-mono text-neutral-500">
            Concept & Scripting &nbsp;/&nbsp; Cinematography &nbsp;/&nbsp; Editing &nbsp;/&nbsp; Colour & Sound Suite
          </p>
        </div>
      </section>

      {/* Production Cards matching Image 2 */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#C59B4B] font-semibold">
              PRODUCTION DISCIPLINES & FORMATS
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl font-sans">
              Strategic direction,<br />
              cinematic execution
            </h2>
            <p className="mt-3 max-w-2xl text-xs md:text-sm text-neutral-400 leading-relaxed">
              Every production is engineered from brief to delivery: shaping creative treatment, direction, lighting, sound design, and viral social cuts.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#C59B4B] hover:text-white transition-colors"
          >
            <span>COMMISSION A PRODUCTION</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0D0F14] p-6 transition-all duration-300 hover:border-[#C59B4B]/60 hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
              >
                <div className="space-y-4">
                  {/* Top Badge with Icon */}
                  <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-mono font-medium text-neutral-300">
                    <Icon size={13} className="text-[#C59B4B]" />
                    <span>{f.badge}</span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-medium tracking-tight text-white group-hover:text-[#C59B4B] transition-colors leading-snug">
                    {f.title}
                  </h3>

                  {/* Bullets */}
                  <ul className="space-y-2 text-xs text-neutral-400 pt-2">
                    {f.bullets.map((b, idx) => (
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
                    <Link to="/contact" search={{ service: f.serviceSlug }}>
                      <span>{f.cta}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Embedded Reels Showcase matching Image 1 */}
      <section className="container-x py-10">
        <ReelsShowcase />
      </section>

      {/* Production Workflow Process */}
      <section className="border-y border-white/10 bg-[#0B0D12] py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="From brief to final frame"
            title="A considered production, end to end."
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Discover & develop",
                "Clarify the audience, message, references and distribution. Shape the concept, storyboards and script before shoot day.",
              ],
              [
                "Plan & prepare",
                "Agree the shot list, locations, talent, permissions and lighting schedule. Define what the finished film needs to achieve.",
              ],
              [
                "Shoot & direct",
                "Coordinate direction, cinematography, multi-camera lighting and sound recording around the approved creative treatment.",
              ],
              [
                "Edit & deliver",
                "Review the rough cut, refine Hollywood colour grading and sound mix, and export multi-aspect ratio deliverables.",
              ],
            ].map(([t, d], i) => (
              <li key={t} className="border-t border-white/10 pt-5">
                <span className="font-mono text-xs text-[#C59B4B]">0{i + 1}</span>
                <h3 className="mt-5 text-xl font-medium text-white">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTA />
    </>
  );
}
