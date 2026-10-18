import { useState, useId } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calculator,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Calendar,
  Layers,
  Clock,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceOption {
  id: string;
  title: string;
  category: string;
  baseMin: number;
  baseMax: number;
  weeksMin: number;
  weeksMax: number;
  deliverables: string[];
}

const serviceOptions: ServiceOption[] = [
  {
    id: "web-development",
    title: "Web Development & Brand Site",
    category: "Build",
    baseMin: 45000,
    baseMax: 85000,
    weeksMin: 2,
    weeksMax: 4,
    deliverables: ["Custom responsive design", "Clean React/TypeScript code", "SEO optimization & Core Web Vitals", "CMS integration"],
  },
  {
    id: "custom-software",
    title: "Custom Web App / Portal",
    category: "Build",
    baseMin: 120000,
    baseMax: 220000,
    weeksMin: 4,
    weeksMax: 8,
    deliverables: ["Role-based access & auth", "Relational database architecture", "Custom dashboard & reporting", "API integrations"],
  },
  {
    id: "e-commerce",
    title: "E-Commerce / D2C Store",
    category: "Build",
    baseMin: 65000,
    baseMax: 130000,
    weeksMin: 3,
    weeksMax: 6,
    deliverables: ["Catalogue & variant structuring", "Payment & shipping gateway", "Frictionless checkout UX", "Mobile-first shopping funnel"],
  },
  {
    id: "mobile-apps",
    title: "Mobile App (iOS & Android)",
    category: "Build",
    baseMin: 150000,
    baseMax: 280000,
    weeksMin: 6,
    weeksMax: 10,
    deliverables: ["Cross-platform React Native build", "Push notification infrastructure", "App Store & Play Store readiness", "Offline caching support"],
  },
  {
    id: "video-production",
    title: "Brand Film & Video Cinema",
    category: "Produce",
    baseMin: 75000,
    baseMax: 160000,
    weeksMin: 2,
    weeksMax: 4,
    deliverables: ["Scripting & creative treatment", "Cinema direction & 4K shoot", "DaVinci Resolve color grading", "Custom sound design & master cuts"],
  },
  {
    id: "social-media",
    title: "Reels & Instagram Growth Retainer",
    category: "Grow",
    baseMin: 35000,
    baseMax: 70000,
    weeksMin: 4,
    weeksMax: 4,
    deliverables: ["8-12 cinematic vertical reels/month", "Script hooks & viral formatting", "Community & DM management", "Monthly performance report"],
  },
];

const scaleMultipliers = [
  { id: "starter", label: "Starter / MVP", multiplier: 1.0, desc: "Lean scope for new launches" },
  { id: "growth", label: "Growth / Scaling", multiplier: 1.5, desc: "For established businesses expanding market share" },
  { id: "flagship", label: "Enterprise / Flagship", multiplier: 2.2, desc: "Comprehensive architecture & high-touch execution" },
];

const addOns = [
  { id: "ai", label: "AI Assistant & Automated Workflows", price: 35000, desc: "Custom LLM integration & prompt engineering" },
  { id: "3d", label: "3D Visuals & Custom Motion System", price: 25000, desc: "Spline/WebGL hero interactive assets" },
  { id: "speed", label: "Sub-Second Edge CDN & Audit", price: 15000, desc: "Lighthouse 95+ guarantee & accessibility" },
  { id: "retainer", label: "30-Day Dedicated Support & Care", price: 20000, desc: "Bug fixes, updates, and performance tuning" },
];

export function ProjectEstimator() {
  const [selectedService, setSelectedService] = useState<string>("web-development");
  const [selectedScale, setSelectedScale] = useState<string>("starter");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["speed"]);
  const [urgency, setUrgency] = useState<"standard" | "urgent" | "flexible">("standard");

  const service: ServiceOption = serviceOptions.find((s) => s.id === selectedService) || serviceOptions[0]!;
  const scale = scaleMultipliers.find((s) => s.id === selectedScale) || scaleMultipliers[0]!;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const urgencyMultiplier = urgency === "urgent" ? 1.25 : urgency === "flexible" ? 0.92 : 1.0;

  // Calculate pricing
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const calculatedMin = Math.round(((service.baseMin * scale.multiplier) + addonsTotal) * urgencyMultiplier);
  const calculatedMax = Math.round(((service.baseMax * scale.multiplier) + (addonsTotal * 1.15)) * urgencyMultiplier);

  // Calculate timeline
  const timelineMin = urgency === "urgent" ? Math.max(1, Math.round(service.weeksMin * 0.7)) : service.weeksMin;
  const timelineMax = urgency === "urgent" ? Math.max(2, Math.round(service.weeksMax * 0.8)) : urgency === "flexible" ? service.weeksMax + 2 : service.weeksMax;

  const formatINR = (val: number) => {
    return "₹" + val.toLocaleString("en-IN");
  };

  return (
    <div id="estimator" className="relative overflow-hidden rounded-2xl border border-primary/20 bg-ink/80 p-6 shadow-2xl backdrop-blur-xl md:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
              <Calculator size={14} />
              Interactive Project Estimator
            </div>
            <h3 className="mt-2 text-2xl font-semibold md:text-3xl">Scope Your Investment & Timeline</h3>
            <p className="mt-1 text-sm text-muted-foreground">Select your requirements to see realistic agency budgeting with zero surprises.</p>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            ✦ Instant Calculation
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Controls Column (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* 1. Service Type */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                1. Select Core Capability
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {serviceOptions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.id)}
                    className={`flex flex-col rounded-lg border p-3 text-left transition-all ${
                      selectedService === s.id
                        ? "border-primary bg-primary/15 text-foreground shadow-sm ring-1 ring-primary/40"
                        : "border-border/70 bg-card/40 text-muted-foreground hover:border-border hover:bg-card/70 hover:text-foreground"
                    }`}
                  >
                    <span className="text-xs font-medium text-foreground">{s.title}</span>
                    <span className="mt-2 font-mono text-[10px] text-primary">from {formatINR(s.baseMin)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Project Scale */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                2. Project Scale & Complexity
              </label>
              <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {scaleMultipliers.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedScale(m.id)}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      selectedScale === m.id
                        ? "border-primary bg-primary/15 text-foreground ring-1 ring-primary/40"
                        : "border-border/70 bg-card/40 text-muted-foreground hover:border-border hover:bg-card/70 hover:text-foreground"
                    }`}
                  >
                    <div className="text-xs font-medium text-foreground">{m.label}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground leading-snug">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. High-Value Add-Ons */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                3. Specialized Add-ons & Integrations
              </label>
              <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {addOns.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                        isChecked
                          ? "border-primary/60 bg-primary/10 text-foreground ring-1 ring-primary/30"
                          : "border-border/70 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${isChecked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"}`}>
                        {isChecked && <CheckCircle2 size={12} />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground">{addon.label}</div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground leading-tight">{addon.desc}</div>
                        <div className="mt-1 font-mono text-[10px] text-primary">+{formatINR(addon.price)}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Timeline Urgency */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                4. Delivery Pace
              </label>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[
                  { id: "urgent", label: "⚡ Fast-Track / Sprint (+25%)" },
                  { id: "standard", label: "Standard Cadence (Recommended)" },
                  { id: "flexible", label: "Flexible Schedule (-8%)" },
                ].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUrgency(u.id as any)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                      urgency === u.id
                        ? "border-primary bg-primary text-primary-foreground font-medium"
                        : "border-border/80 bg-card/50 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Card (5 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-primary/30 bg-card/90 p-6 shadow-xl lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Estimated Investment</span>
                <span className="flex items-center gap-1 text-[11px] text-primary">
                  <Coins size={12} /> Fair Studio Pricing
                </span>
              </div>

              <div className="mt-5">
                <div className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {formatINR(calculatedMin)} – {formatINR(calculatedMax)}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Tailored scope based on {scale.label} complexity. Final quotation provided after discovery call.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/40 p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">Estimated Production Window</div>
                  <div className="text-sm font-semibold text-primary">
                    {timelineMin} – {timelineMax} Weeks
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Included in This Scope:
                </div>
                <ul className="space-y-1.5 text-xs text-foreground">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {selectedAddons.map((id) => {
                    const addon = addOns.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <li key={id} className="flex items-start gap-2 text-primary">
                        <Sparkles size={13} className="mt-0.5 shrink-0" />
                        <span>{addon.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-border/80 pt-6">
              <div className="flex flex-col gap-2.5">
                <Button asChild size="lg" className="w-full">
                  <Link
                    to="/contact"
                    search={{
                      service: service.id,
                    }}
                  >
                    Lock in This Estimate <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/book">
                    <Calendar size={14} className="mr-1.5" /> Book 20-Min Discovery with Om
                  </Link>
                </Button>
              </div>
              <p className="mt-3 text-center text-[10px] text-muted-foreground">
                No commitment required. We respect your confidentiality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
