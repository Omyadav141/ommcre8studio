import { useState } from "react";
import {
  Play,
  X,
  Flame,
  ArrowUpRight,
  Instagram,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReelData {
  id: string;
  views: string;
  categoryTag: string;
  title: string;
  account: string;
  handle: string;
  instagramUrl: string;
  aspect: "9:16";
  gradient: string;
  description: string;
}

const trueLegalReels: ReelData[] = [
  {
    id: "tl-reel-1",
    views: "992K VIEWS",
    categoryTag: "VIRAL LANDMARK REEL",
    title: "Chamber Practice & Legal Drafting",
    account: "True Legal Advice",
    handle: "@true_legal_advice",
    instagramUrl: "https://www.instagram.com/true_legal_advice/",
    aspect: "9:16",
    gradient: "from-[#2A1E14] via-[#1A1512] to-[#0A0C0E]",
    description: "In-chamber drafting insights for High Court petitions, trademark oppositions, and courtroom litigation mandates by Adv. Shareen Hussain.",
  },
  {
    id: "tl-reel-2",
    views: "178K VIEWS",
    categoryTag: "VIRAL CONSULTATION",
    title: "In-Chamber Client Consultation",
    account: "True Legal Advice",
    handle: "@true_legal_advice",
    instagramUrl: "https://www.instagram.com/true_legal_advice/",
    aspect: "9:16",
    gradient: "from-[#1F232D] via-[#141720] to-[#0A0C0E]",
    description: "Demystifying civil disputes, corporate agreements, and marriage registration procedures with confidential attorney counsel.",
  },
  {
    id: "tl-reel-3",
    views: "11.8K VIEWS",
    categoryTag: "CHAMBER LEADERSHIP",
    title: "Advocate Shareen Hussain",
    account: "True Legal Advice",
    handle: "@true_legal_advice",
    instagramUrl: "https://www.instagram.com/true_legal_advice/",
    aspect: "9:16",
    gradient: "from-[#221F28] via-[#15131A] to-[#0A0C0E]",
    description: "Profile and practice ethos of Registered Trade Mark Attorney & High Court Advocate Shareen Hussain (B.Com, M.Com, LL.B).",
  },
  {
    id: "tl-reel-4",
    views: "4,539 VIEWS",
    categoryTag: "COURT LITIGATION",
    title: "Then You Start To Grow",
    account: "True Legal Advice",
    handle: "@true_legal_advice",
    instagramUrl: "https://www.instagram.com/true_legal_advice/",
    aspect: "9:16",
    gradient: "from-[#18231E] via-[#0F1713] to-[#0A0C0E]",
    description: "High Court daily arguments, courtroom motions, and strategic dispute navigation for emerging business owners.",
  },
  {
    id: "tl-reel-5",
    views: "3,592 VIEWS",
    categoryTag: "COURT TRANSIT",
    title: "Court Motion & Bail Execution",
    account: "True Legal Advice",
    handle: "@true_legal_advice",
    instagramUrl: "https://www.instagram.com/true_legal_advice/",
    aspect: "9:16",
    gradient: "from-[#201D1A] via-[#121110] to-[#0A0C0E]",
    description: "Daily transit between Nagpur High Court and District Court benches for urgent civil, trademark, and criminal hearings.",
  },
];

export function ReelsShowcase() {
  const [selectedReel, setSelectedReel] = useState<ReelData | null>(null);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#08090B] py-12 md:py-16 text-[#EDEDED]">
      {/* Background radial glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[#C59B4B]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 container-x">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C59B4B]/40 bg-[#C59B4B]/10 px-3 py-1 font-mono text-[11px] font-medium text-[#C59B4B]">
              <Sparkles size={13} />
              OM CREATE STUDIO · SHORT-FORM CINEMA & VIRAL REELS
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-sans">
                Viral Social Direction by OM CREATE STUDIO
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                <Flame size={13} /> 992K+ Views
              </span>
            </div>

            <p className="mt-3 max-w-2xl text-xs md:text-sm text-neutral-300 leading-relaxed">
              Client Spotlight: <strong className="text-white">True Legal Advice</strong> (<span className="text-[#C59B4B]">@true_legal_advice</span>). We architected in-chamber lighting, 9:16 cinema framing, hook-first scripts, and DaVinci Resolve color grading to achieve over 1.2M+ combined organic views. Click any reel to view the studio case study.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="bg-[#C59B4B] text-[#08090B] hover:bg-[#D4A359] font-semibold text-xs shadow-lg">
              <a href="/contact?service=social-media">
                Commission Viral Reels <ArrowUpRight size={14} className="ml-1" />
              </a>
            </Button>
            <a
              href="https://www.instagram.com/true_legal_advice/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Instagram size={14} />
              <span>Client Profile</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* 5 Vertical Reel Cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {trueLegalReels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setSelectedReel(reel)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0F1218] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#C59B4B]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)] cursor-pointer border-b-2 border-b-[#C59B4B]"
            >
              {/* Top View Badge Row */}
              <div className="relative z-10 flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 rounded-full border border-[#C59B4B]/40 bg-black/70 px-2.5 py-0.5 font-mono font-semibold text-[#C59B4B] backdrop-blur-md">
                  <Flame size={10} />
                  {reel.views}
                </span>
                <span className="rounded-full border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[9px] text-white/90 backdrop-blur-md group-hover:border-[#C59B4B] group-hover:text-[#C59B4B]">
                  Case Study
                </span>
              </div>

              {/* Reel Mockup Viewport */}
              <div className={`relative my-4 flex aspect-[9/14] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b ${reel.gradient} p-4 shadow-inner`}>
                {/* Subtle chamber ambiance grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                {/* Studio watermark pill */}
                <div className="absolute top-2 left-2 z-10 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[8px] text-neutral-400 backdrop-blur-sm">
                  OM CREATE STUDIO
                </div>

                {/* Central Play Button */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/60 text-[#C59B4B] backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:border-[#C59B4B] group-hover:bg-[#C59B4B] group-hover:text-[#08090B] shadow-xl">
                  <Play size={18} className="ml-0.5 fill-current" />
                </div>
              </div>

              {/* Bottom Reel Content */}
              <div className="relative z-10 space-y-1">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#C59B4B] font-semibold">
                  {reel.categoryTag}
                </div>
                <h4 className="text-xs font-semibold text-white line-clamp-1 group-hover:text-[#C59B4B] transition-colors">
                  {reel.title}
                </h4>

                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-neutral-400">
                  <div className="flex items-center gap-1 truncate">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C59B4B]" />
                    <span className="truncate">Client: {reel.account}</span>
                  </div>
                  <span className="text-[#C59B4B] font-mono text-[9px]">
                    Case Study ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Growth Note */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0E1015]/80 p-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-[#C59B4B]" />
            <span>
              <strong className="text-white">OM CREATE STUDIO (OMMCRE8)</strong> handles end-to-end content scripting, in-chamber lighting, 4K video editing, and organic Instagram algorithm scaling.
            </span>
          </div>
          <a
            href="/contact?service=social-media"
            className="text-[#C59B4B] hover:underline font-mono text-[11px] inline-flex items-center gap-1"
          >
            <span>Commission Studio Video & Reels</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Reel Modal Detail Sheet */}
      {selectedReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-in fade-in"
          onClick={() => setSelectedReel(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-[#0F1218] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#C59B4B] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#08090B]">
                  {selectedReel.views}
                </span>
                <span className="font-mono text-xs text-white font-medium uppercase tracking-wider">
                  OM CREATE STUDIO CASE STUDY
                </span>
              </div>
              <button
                onClick={() => setSelectedReel(null)}
                className="rounded-lg p-1 text-neutral-400 hover:text-white"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className={`mt-4 relative flex flex-col items-center justify-center rounded-xl bg-gradient-to-b ${selectedReel.gradient} p-6 shadow-inner text-center`}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C59B4B] text-[#08090B] shadow-xl animate-pulse-glow">
                <Play size={22} className="ml-1 fill-current" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-white tracking-tight">
                {selectedReel.title}
              </h3>
              <p className="mt-2 text-xs text-slate-200 max-w-sm leading-relaxed">
                {selectedReel.description}
              </p>

              {/* OM CREATE STUDIO Credits & Scope */}
              <div className="mt-5 w-full rounded-xl border border-white/10 bg-black/60 p-4 text-left text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] text-[#C59B4B] uppercase tracking-wider font-bold">
                    Directed by OM CREATE STUDIO
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400">Delhi NCR & Global</span>
                </div>
                <div className="text-slate-300">
                  Client: <strong className="text-white">{selectedReel.account}</strong> ({selectedReel.handle})
                </div>
                <div className="text-neutral-300 text-[11px] leading-relaxed pt-1 border-t border-white/10">
                  <strong className="text-[#C59B4B]">Production Scope:</strong> Narrative hook & legal scripting, in-chamber directional lighting, 9:16 vertical cinema framing, DaVinci Resolve color grading, audio enhancement, and organic Instagram algorithm scaling.
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild className="flex-1 bg-[#C59B4B] text-[#08090B] hover:bg-[#D4A359] font-semibold text-xs">
                <a href="/contact?service=social-media">
                  Commission Similar Reels <ArrowUpRight size={14} className="ml-1" />
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">
                <a href={selectedReel.instagramUrl} target="_blank" rel="noreferrer">
                  <Instagram size={14} className="mr-1.5" /> Watch on Instagram <ArrowUpRight size={12} className="ml-0.5" />
                </a>
              </Button>
              <Button variant="ghost" onClick={() => setSelectedReel(null)} className="text-neutral-400 text-xs">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
