import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { studio } from "@/lib/site";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/production", label: "Production" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Loader() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("ocs-intro")) return;
    sessionStorage.setItem("ocs-intro", "1");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 2200);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else { setOut(true); setTimeout(() => setShow(false), 450); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!show) return null;
  const word = pct < 70 ? "OM YADAV" : "OMCRE8 STUDIO";
  return (
    <div aria-hidden className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${out ? "opacity-0" : "opacity-100"}`}>
      <div className="flex text-2xl font-medium tracking-[0.3em] md:text-4xl">
        {word.split("").map((c, i) => (
          <span key={i} className="animate-letter inline-block" style={{ animationDelay: `${i * 35}ms` }}>{c === " " ? "\u00a0" : c}</span>
        ))}
      </div>
      <div className="mt-8 h-px w-48 bg-border">
        <div className="h-px bg-foreground transition-[width] duration-75" style={{ width: `${pct}%` }} />
      </div>
      <span className="eyebrow mt-3 tabular-nums">{pct}%</span>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className="sticky top-3 z-50 px-3">
      <div className={`mx-auto max-w-5xl rounded-lg transition-all ${scrolled || open ? "glass-card bg-card/90" : "glass-card"}`}>
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-sm font-semibold tracking-[0.2em]" onClick={() => setOpen(false)}>OMCRE<span className="text-gold">8</span><span className="ml-1.5 text-xs font-normal text-muted-foreground">STUDIO</span></Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm"><Link to="/book">Book a Call <ArrowUpRight /></Link></Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>
      <div className={`grid overflow-hidden transition-all duration-300 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <nav className="min-h-0" aria-label="Mobile">
          <div className="flex flex-col px-4 pb-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-3 text-base last:border-0">{n.label}</Link>
            ))}
            <Link to="/faq" onClick={() => setOpen(false)} className="py-3 text-base">FAQ</Link>
          </div>
        </nav>
      </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm font-semibold tracking-[0.2em]">OMCRE<span className="text-gold">8</span> STUDIO</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">Digital products, brand experiences and creative production. An independent studio founded by {studio.founder}.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="eyebrow mb-1">Studio</span>
          <Link to="/services" className="text-muted-foreground hover:text-foreground">Services</Link>
          <Link to="/work" className="text-muted-foreground hover:text-foreground">Work</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/process" className="text-muted-foreground hover:text-foreground">Process</Link>
          <Link to="/insights" className="text-muted-foreground hover:text-foreground">Insights</Link>
          <Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="eyebrow mb-1">Contact</span>
          <a href={`mailto:${studio.email}`} className="text-muted-foreground hover:text-foreground">{studio.email}</a>
          <Link to="/book" className="text-muted-foreground hover:text-foreground">Book a call</Link>
          <a href={studio.personalSite} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">omyadav.online</a>
        </div>
      </div>
      <div className="container-x border-t border-ink-soft py-6 text-xs text-muted-foreground">© {new Date().getFullYear()} OMCRE8 Studio. All rights reserved. <Link to="/privacy" className="ml-5">Privacy</Link><Link to="/terms" className="ml-5">Terms</Link></div>
    </footer>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

export function CTA() {
  return <section className="mt-24 border-y bg-ink"><div className="container-x py-20 md:py-28"><Reveal><p className="eyebrow">Your next chapter</p><h2 className="mt-5 max-w-3xl text-4xl font-medium md:text-6xl">Have an idea?<br />Let's make it happen.</h2><div className="mt-8 flex flex-wrap items-center gap-6"><Button asChild size="lg"><Link to="/contact">Start a Project <ArrowUpRight /></Link></Button><Button asChild variant="outline" size="lg"><Link to="/book">Talk with Om <ArrowUpRight /></Link></Button></div><p className="mt-6 text-sm text-muted-foreground">A direct conversation. A considered plan. One coordinated studio.</p></Reveal></div></section>;
}

export function seo(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
