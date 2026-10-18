import { useRef, useState, useEffect } from "react";
import {
  Play,
  ExternalLink,
  Flame,
  Eye,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export interface ReelItem {
  id: string;
  title: string;
  subtitle: string;
  views: string;
  isViral?: boolean;
  tag: string;
  thumbnail: string;
  videoSrc: string;
  instagramUrl: string;
}

// All authentic viral reels from @true_legal_advice Instagram
const ALL_VIRAL_REELS: ReelItem[] = [
  {
    id: "reel-992k",
    title: "Chamber Practice & Legal Drafting",
    subtitle: "Adv. Shareen Hussain reviewing civil & trademark briefs at desk",
    views: "992K Views",
    isViral: true,
    tag: "Viral Landmark Reel",
    thumbnail: "/images/reels/reel-992k.jpg",
    videoSrc: "/videos/reels/reel-992k.mp4",
    instagramUrl: "https://www.instagram.com/true_legal_advice/reels/",
  },
  {
    id: "reel-178k",
    title: "In-Chamber Client Consultation",
    subtitle: "Direct advocate-client privilege consultation at Trisharan Square",
    views: "178K Views",
    isViral: true,
    tag: "Viral Consultation",
    thumbnail: "/images/reels/reel-178k.jpg",
    videoSrc: "/videos/reels/reel-178k.mp4",
    instagramUrl: "https://www.instagram.com/true_legal_advice/reels/",
  },
  {
    id: "reel-11k",
    title: "Advocate Shareen Hussain",
    subtitle: "Lead Advocate & Head of True Legal Advice practice",
    views: "11.8K Views",
    isViral: true,
    tag: "Chamber Leadership",
    thumbnail: "/images/reels/reel-11k.jpg",
    videoSrc: "/videos/reels/reel-11k.mp4",
    instagramUrl: "https://www.instagram.com/true_legal_advice/reels/",
  },
  {
    id: "reel-3",
    title: "Then You Start To Grow",
    subtitle: "Daily courtroom litigation and trial advocacy journey",
    views: "4,539 Views",
    tag: "Court Litigation",
    thumbnail: "/images/reels/reel-3.jpg",
    videoSrc: "/videos/reels/reel-3.mp4",
    instagramUrl: "https://www.instagram.com/true_legal_advice/reels/",
  },
  {
    id: "reel-car",
    title: "Court Motion & Hearing Transit",
    subtitle: "Arriving for Bombay High Court & District Court motion hearings",
    views: "3,592 Views",
    tag: "Court Transit",
    thumbnail: "/images/reels/reel-car.jpg",
    videoSrc: "/videos/reels/reel-car.mp4",
    instagramUrl: "https://www.instagram.com/true_legal_advice/reels/",
  },
  {
    id: "reel-1",
    title: "Be The Woman With Everything",
    subtitle: "Dedication, legal research & courtroom preparation",
    views: "3,233 Views",
    tag: "Advocate Mindset",
    thumbnail: "/images/reels/reel-1.jpg",
    videoSrc: "/videos/reels/reel-1.mp4",
    instagramUrl: "https://www.instagram.com/true_legal_advice/reels/",
  },
  {
    id: "reel-desk2",
    title: "Chamber Workstation & Research",
    subtitle: "Drafting trademark petitions and property agreements",
    views: "3,273 Views",
    tag: "Legal Research",
    thumbnail: "/images/reels/reel-desk2.jpg",
    videoSrc: "/videos/reels/reel-desk2.mp4",
    instagramUrl: "https://www.instagram.com/true_legal_advice/reels/",
  },
  {
    id: "reel-7",
    title: "Khandan Ki Pehli Advocate",
    subtitle: "First lawyer in the family — inspiring professional legacy",
    views: "1,635 Views",
    isViral: true,
    tag: "Family Heritage",
    thumbnail: "/images/reels/reel-7.jpg",
    videoSrc: "/videos/reels/reel-7.mp4",
    instagramUrl: "https://www.instagram.com/true_legal_advice/reels/",
  },
];

export function ReelsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track which reel is currently playing in-place right on the card
  const [playingReelId, setPlayingReelId] = useState<string | null>(null);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(false);

  // Active playing video element ref
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const wasPlayingBeforeScrollRef = useRef(false);

  // Scroll left/right helper buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Handle in-place Play button click
  function handlePlayClick(reelId: string) {
    if (playingReelId === reelId) {
      if (activeVideoRef.current) {
        activeVideoRef.current.pause();
      }
      wasPlayingBeforeScrollRef.current = false;
      setPlayingReelId(null);
    } else {
      wasPlayingBeforeScrollRef.current = true;
      setPlayingReelId(reelId);
    }
  }

  // User requirement: "if I scroll it automatically stop"
  // Stop playing video whenever the user scrolls the horizontal carousel or the window
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (playingReelId) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (activeVideoRef.current && !activeVideoRef.current.paused) {
            activeVideoRef.current.pause();
          }
          wasPlayingBeforeScrollRef.current = false;
          setPlayingReelId(null);
        }, 120);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimeout);
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [playingReelId]);

  // Also pause if browser tab is switched or minimized
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && activeVideoRef.current && !activeVideoRef.current.paused) {
        activeVideoRef.current.pause();
        wasPlayingBeforeScrollRef.current = false;
        setPlayingReelId(null);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#08090B] py-12 md:py-16 text-[#EDEDED] border border-white/10">
      {/* Subtle gold / ambient glow accents */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[#C59B4B]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative z-10 container-x">
        {/* Section Header matching the screenshot */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border shadow-sm"
              style={{
                background: "linear-gradient(135deg, rgba(240,148,51,0.15), rgba(188,24,136,0.15))",
                borderColor: "rgba(203,167,88,0.3)",
                color: "#f6ad55",
              }}
            >
              <InstagramIcon size={14} />
              <span>Real Advocate Reels · 992K+ & 178K+ Views</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
              <span>Follow @true_legal_advice</span>
              <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <Flame size={12} className="text-rose-400" />
                <span>Viral Reels</span>
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              Courtroom insights, consultation cases, trademark guidance, and legal reels from Adv. Shareen Hussain. Click any reel to play directly on the page.
            </p>
          </div>

          <a
            href="https://www.instagram.com/true_legal_advice/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white no-underline transition-all hover:scale-105 hover:shadow-lg shadow-md cursor-pointer shrink-0"
            style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
          >
            <InstagramIcon size={14} />
            <span>Follow on Instagram</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Scrollable Reel Strip with Dreamy Shadow Overlays on Left and Right */}
        <div className="relative group/track">
          {/* Dreamy shadow edge masks on left and right */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-16 bg-gradient-to-r from-[#08090B] via-[#08090B]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-16 bg-gradient-to-l from-[#08090B] via-[#08090B]/80 to-transparent" />

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/track:opacity-100 transition-all duration-200 hover:bg-[#C59B4B] hover:text-black hover:scale-110 shadow-2xl cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/track:opacity-100 transition-all duration-200 hover:bg-[#C59B4B] hover:text-black hover:scale-110 shadow-2xl cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar py-4 px-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ALL_VIRAL_REELS.map((reel) => {
              const isPlaying = playingReelId === reel.id;
              const hasError = videoErrors[reel.id];

              return (
                <div
                  key={reel.id}
                  className="flex-shrink-0 w-[210px] sm:w-[230px] group select-none"
                >
                  <div
                    className={`block relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border bg-[#121214] transition-all duration-300 ${
                      isPlaying
                        ? "border-[#cba758] ring-2 ring-[#cba758]/50 shadow-2xl scale-[1.02]"
                        : reel.isViral
                        ? "border-[#cba758]/80 hover:border-[#cba758] hover:-translate-y-1.5 shadow-[#cba758]/10"
                        : "border-white/15 hover:border-[#cba758]/60 hover:-translate-y-1.5"
                    }`}
                  >
                    {/* IN-PLACE PLAYBACK: Clean full-bleed video playing directly inside the card */}
                    {isPlaying && !hasError ? (
                      <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                        <video
                          ref={(el) => {
                            activeVideoRef.current = el;
                            if (el) {
                              el.muted = isMuted;
                              const p = el.play();
                              if (p !== undefined) {
                                p.catch(() => {
                                  el.muted = true;
                                  setIsMuted(true);
                                  el.play().catch(() => {});
                                });
                              }
                            }
                          }}
                          src={reel.videoSrc}
                          poster={reel.thumbnail}
                          playsInline
                          autoPlay
                          loop
                          disablePictureInPicture
                          controls={false}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            const vid = e.currentTarget;
                            if (vid.paused) {
                              vid.play();
                              wasPlayingBeforeScrollRef.current = true;
                            } else {
                              vid.pause();
                              wasPlayingBeforeScrollRef.current = false;
                            }
                          }}
                          onError={() => {
                            setVideoErrors((prev) => ({ ...prev, [reel.id]: true }));
                          }}
                        />

                        {/* Top-Right: Clean Cross Button to stop and return to card */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeVideoRef.current) {
                              activeVideoRef.current.pause();
                            }
                            wasPlayingBeforeScrollRef.current = false;
                            setPlayingReelId(null);
                          }}
                          className="absolute top-2.5 right-2.5 z-30 h-8 w-8 rounded-full bg-black/85 text-white hover:bg-rose-600 flex items-center justify-center transition-all text-sm font-bold border border-white/20 shadow-2xl cursor-pointer hover:scale-110"
                          title="Close video"
                          aria-label="Close video"
                        >
                          <X size={15} />
                        </button>

                        {/* Top-Left: Audio Mute / Unmute toggle */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted((prev) => !prev);
                          }}
                          className="absolute top-2.5 left-2.5 z-30 h-8 w-8 rounded-full bg-black/75 text-white/90 hover:bg-black/95 hover:text-white flex items-center justify-center transition-all border border-white/20 shadow-xl cursor-pointer"
                          title={isMuted ? "Unmute audio" : "Mute audio"}
                          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                        >
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                      </div>
                    ) : isPlaying && hasError ? (
                      /* Clean fallback if video encounters an error */
                      <div className="relative w-full h-full bg-gradient-to-b from-[#18181b] via-[#121214] to-black flex flex-col items-center justify-between p-4 text-center">
                        <div className="w-full flex items-center justify-end">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingReelId(null);
                              setVideoErrors((prev) => ({ ...prev, [reel.id]: false }));
                            }}
                            className="h-7 w-7 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-xs cursor-pointer transition-colors"
                            title="Back to reel cover"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        <div className="space-y-2 py-2">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-[#cba758]/40 text-[#cba758] flex items-center justify-center mx-auto shadow-inner">
                            <InstagramIcon size={22} className="text-[#cba758]" />
                          </div>
                          <h5 className="text-xs font-serif font-bold text-white leading-snug">
                            {reel.title}
                          </h5>
                          <p className="text-[11px] text-slate-300 leading-relaxed px-1">
                            Adv. Shareen Hussain chamber legal reel · <span className="text-[#cba758] font-bold">{reel.views}</span>
                          </p>
                        </div>

                        <div className="w-full pb-2">
                          <a
                            href={reel.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-transform hover:scale-102 shadow-md cursor-pointer no-underline"
                          >
                            <span>Watch on @true_legal_advice</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    ) : (
                      /* Normal Reel Cover Card with Real Thumbnail Image */
                      <>
                        {/* Upper Card / Play Trigger: Clicking plays the reel right on the card */}
                        <div
                          className="absolute inset-0 cursor-pointer"
                          onClick={() => handlePlayClick(reel.id)}
                        >
                          <img
                            src={reel.thumbnail}
                            alt={reel.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />

                          {/* Dark Gradient Overlay for Contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/40 pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                            {reel.isViral ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#cba758] text-black shadow-md">
                                <Flame size={11} className="text-black" />
                                <span>{reel.views}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-200 border border-white/20">
                                <Eye size={10} />
                                <span>{reel.views}</span>
                              </span>
                            )}

                            <span className="text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
                              Play
                            </span>
                          </div>

                          {/* Center Play Button: CLICK PLAYS DIRECTLY IN-PLACE */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayClick(reel.id);
                              }}
                              className="h-12 w-12 rounded-full bg-black/60 backdrop-blur-md border border-[#cba758] text-[#cba758] flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-[#cba758] group-hover:text-black transition-all duration-300 cursor-pointer"
                              aria-label={`Play ${reel.title} in card`}
                            >
                              <Play size={18} className="ml-0.5 fill-current" />
                            </button>
                          </div>
                        </div>

                        {/* Lower Area: Clicking anywhere here directly opens the Instagram reel */}
                        <a
                          href={reel.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black via-black/90 to-transparent z-20 space-y-1 block no-underline group/link cursor-pointer hover:bg-black/95 transition-colors"
                          title="Open @true_legal_advice on Instagram"
                        >
                          <span className="text-[9.5px] font-mono font-bold text-[#cba758] uppercase tracking-wider block">
                            {reel.tag}
                          </span>
                          <h4 className="text-xs font-serif font-bold text-white leading-snug line-clamp-2 group-hover/link:text-[#cba758] transition-colors">
                            {reel.title}
                          </h4>

                          {/* Footer Instagram handle: Direct link to Instagram profile */}
                          <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-300 border-t border-white/10 mt-1">
                            <span className="flex items-center gap-1 text-white group-hover/link:text-rose-400 transition-colors">
                              <InstagramIcon size={11} className="text-rose-400" />
                              <span className="font-semibold">True Legal Advice</span>
                            </span>
                            <span className="text-[#cba758] font-bold text-[9.5px] flex items-center gap-0.5 group-hover/link:underline">
                              <span>@true_legal_advice</span>
                              <ExternalLink size={9} />
                            </span>
                          </div>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Studio Growth Note Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0E1015]/80 p-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-[#C59B4B]" />
            <span>
              Produced, scripted, shot, and color-graded by <strong className="text-white">OM CREATE STUDIO (OMMCRE8)</strong>. Scaled organically to <strong className="text-[#C59B4B]">1.2M+ combined impressions</strong>.
            </span>
          </div>
          <a
            href="/contact?service=social-media"
            className="text-[#C59B4B] hover:underline font-mono text-[11px] inline-flex items-center gap-1"
          >
            <span>Commission Viral Reels for Your Brand</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
