import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Code2,
  Film,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, Reveal, SectionHead, seo } from "@/components/site/Shell";
import { studio } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About the Studio & Founder — OMMCRE8 Studio",
      `Meet ${studio.founder}, the creative engineer and director behind OMMCRE8 Studio. Engineering digital platforms, viral reels, and cinema productions for modern brands.`
    ),
  component: About,
});

function About() {
  return (
    <>
      {/* Hero */}
      <section className="container-x pt-20 md:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-[#C59B4B]">
          <Sparkles size={12} />
          <span>INDEPENDENT · HANDS-ON · MULTIDISCIPLINARY</span>
        </div>

        <h1 className="mt-5 max-w-4xl text-5xl font-medium tracking-tight text-white md:text-7xl font-sans">
          One studio.<br />
          <span className="text-[#C59B4B]">Directed by {studio.founder}.</span>
        </h1>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2">
          <p className="text-2xl font-light leading-relaxed text-white">
            The architect and creative director behind high-converting client platforms, viral social media growth, and cinematic productions.
          </p>
          <div className="space-y-5 leading-relaxed text-slate-200 text-sm">
            <p>
              <strong className="text-white">OMMCRE8 Studio</strong> is the independent practice of <strong className="text-white">{studio.founder}</strong>. Rather than running a bloated agency with endless account managers, Om works hands-on as your principal technology architect, visual designer, and film director.
            </p>
            <p>
              We engineer custom digital platforms from the ground up—like our flagship client platform <strong className="text-white">True Legal Advice (trulegaladvice.com)</strong>—and scale organic reach through viral short-form cinema reels generating <strong className="text-[#C59B4B]">992,000+ views</strong>.
            </p>
            <p>
              From the first line of code and user journey mapping to DaVinci Resolve color grading and high-intent marketing funnels, every deliverable is crafted with relentless precision.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Photos & Environment */}
      <section className="container-x mt-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0D0F14] shadow-2xl">
            <img
              src="/studio.jpg"
              alt="OMMCRE8 Studio design and engineering workspace"
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#C59B4B]">
                Studio Workspace · Delhi NCR
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Where Digital Architecture & Code Take Shape
              </h3>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0D0F14] shadow-2xl">
            <img
              src="/cinema-studio.jpg"
              alt="OMMCRE8 Cinema and Video Production Suite"
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#C59B4B]">
                Film & Color Grading Suite
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Cinema Production & Viral Short-Form Direction
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight: The Guy Who Runs Client Websites */}
      <section className="container-x mt-24">
        <div className="rounded-2xl border border-white/15 bg-[#0D0F14] p-8 md:p-14 shadow-2xl">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C59B4B]/30 bg-[#C59B4B]/10 px-3 py-1 font-mono text-xs text-[#C59B4B]">
                <span>PRINCIPAL CRAFT & DIRECTION</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-sans">
                Meet {studio.founder}
              </h2>
              <p className="font-mono text-sm text-[#C59B4B]">
                Founder, Lead Engineer & Creative Director · OMMCRE8 Studio
              </p>

              <div className="space-y-4 text-sm text-slate-200 leading-relaxed">
                <p>
                  "Clients don't come to OMMCRE8 to be handed off to a junior coordinator. They come because they want one accountable craftsman who can write production-grade code, design high-converting interfaces, direct lighting and cinematography, and scale organic audience views."
                </p>
                <p>
                  Om personally leads every project from initial strategic scope to launch and ongoing management—ensuring technical performance, brand aesthetic, and commercial outcomes stay uncompromisingly aligned.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button asChild size="lg" className="bg-[#C59B4B] text-[#08090B] hover:bg-[#D4A359] font-semibold text-xs">
                  <Link to="/book">
                    Book Discovery Call with Om <ArrowUpRight size={14} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 text-xs">
                  <a href={studio.personalSite} target="_blank" rel="noreferrer">
                    Visit omyadav.online <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            </div>

            {/* Proof Points & Active Management */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/50 p-6 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#C59B4B]">
                  What Om Personally Manages
                </h3>

                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#C59B4B] shrink-0 mt-0.5" />
                    <span><strong>Client Web Architecture:</strong> Sub-second, accessible platforms built on React, TanStack, and Edge networks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#C59B4B] shrink-0 mt-0.5" />
                    <span><strong>Instagram & Growth:</strong> Scripting, shooting, and scaling viral reels (e.g. 992K+ views for @true_legal_advice).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#C59B4B] shrink-0 mt-0.5" />
                    <span><strong>Cinema & Post-Production:</strong> Multi-camera 4K shoots, DaVinci Resolve grading, sound mix & mastering.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#C59B4B] shrink-0 mt-0.5" />
                    <span><strong>Direct Accountability:</strong> Direct WhatsApp & calendar access with zero middlemen or agency runaround.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-xs text-neutral-300">
                <p className="font-mono text-[11px] text-white">
                  <strong>Location:</strong> Delhi NCR & Worldwide Remote
                </p>
                <p className="mt-1 text-neutral-400">
                  Managing client platforms across India, Southeast Asia, UAE, and the UK.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Philosophy: The Direct Model */}
      <section className="mt-24 border-y border-white/10 bg-[#0B0D12] py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="The OMMCRE8 Model"
            title="Why clients choose a direct creative studio."
            text="Traditional agencies charge overhead for account managers, project coordinators, and outsourced freelancers. OMMCRE8 delivers direct master-craft execution."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Direct Founder Access",
                "Speak directly with Om Yadav from the first call through launch day and ongoing platform iterations.",
              ],
              [
                "No Agency Silos",
                "Code, user journeys, film treatments, and ad campaigns are planned simultaneously under one unified eye.",
              ],
              [
                "Transparent Fixed Scope",
                "Clear deliverables, milestone pricing, and honest timelines with zero hidden fees or markups.",
              ],
              [
                "Complete Client Ownership",
                "Full ownership of your source code, design files, master film cuts, and analytics credentials upon handover.",
              ],
            ].map(([t, d], i) => (
              <Reveal key={t} className="rounded-xl border border-white/10 bg-[#0F1218] p-6 transition-all duration-300 hover:border-[#C59B4B]/60 hover:shadow-xl">
                <p className="font-mono text-xs text-[#C59B4B] font-bold">0{i + 1}</p>
                <h3 className="mt-4 text-lg font-bold text-white">{t}</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
