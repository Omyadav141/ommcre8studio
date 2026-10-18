import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowUpRight,
  Minimize2,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { studio } from "@/lib/site";

export interface ActionChip {
  label: string;
  url?: string;
  prompt?: string;
  action?: () => void;
}

export interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
  actions?: ActionChip[] | undefined;
}

const quickPrompts = [
  "What services does OMCRE8 Studio offer?",
  "What tech stack & frameworks do you use?",
  "What are your project pricing & timelines?",
  "Tell me about founder Om Yadav",
  "How does your cinema & reel production work?",
  "How do I book a discovery call?",
];

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "assistant",
      text: `Hello! I'm the **OMCRE8 Studio AI Assistant**. I'm here to directly answer your questions about our software engineering, digital architecture, brand systems, cinema production, pricing packages, and how founder **${studio.founder}** and our team build high-scale digital products.\n\nWhat can I answer for you today?`,
      timestamp: new Date(),
      actions: [
        { label: "⚡ Pricing & Timelines", prompt: "What are your project pricing and timelines?" },
        { label: "🛠️ Tech Stack & Architecture", prompt: "What tech stack and frameworks do you use?" },
        { label: "🎥 Cinema & Viral Reels", prompt: "Tell me about your video production and viral reels capabilities" },
        { label: "📅 Book Discovery Call", url: "/book" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const generateLocalResponse = (prompt: string): { text: string; actions?: ActionChip[] | undefined } => {
    const q = prompt.toLowerCase();

    // 1. Tech Stack & Frameworks
    if (
      q.includes("tech") ||
      q.includes("stack") ||
      q.includes("framework") ||
      q.includes("react") ||
      q.includes("typescript") ||
      q.includes("next") ||
      q.includes("node") ||
      q.includes("database") ||
      q.includes("backend") ||
      q.includes("architecture") ||
      q.includes("code")
    ) {
      return {
        text: `Here is the production-grade technology architecture OMCRE8 Studio builds with:

• **Frontend Engineering**: React 19, TypeScript, Next.js 15, TanStack Start & Router, Tailwind CSS v4, Lucide icons, and Framer Motion micro-interactions.
• **Backend & Data**: Node.js, Express, PostgreSQL, Drizzle ORM, Supabase, Redis edge caching, and high-concurrency REST/JSON APIs with strict Zod schema validation.
• **Performance Benchmarks**: Sub-second Largest Contentful Paint (<0.8s LCP), zero layout shifts (CLS <0.05), and WCAG AA accessibility compliance.
• **Cinema & Post-Production Suite**: Sony FX3 & RED cinema rigs, G-Master cinema primes, DaVinci Resolve Studio color grading, and broadcast sound engineering.
• **AI & Automations**: Custom RAG (Retrieval-Augmented Generation) knowledge bases, OpenAI GPT-4o & Google Gemini LLM API orchestration.

Would you like to discuss how we would architect your specific platform?`,
        actions: [
          { label: "⚡ Project Pricing & Timelines", prompt: "What are your project pricing and timelines?" },
          { label: "📱 Do you build mobile apps?", prompt: "Tell me about your mobile app development capabilities" },
          { label: "📅 Book Discovery Call", url: "/book" },
        ],
      };
    }

    // 2. Pricing, Budgets & Timelines
    if (
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("estimate") ||
      q.includes("budget") ||
      q.includes("rate") ||
      q.includes("fee") ||
      q.includes("how much")
    ) {
      return {
        text: `We operate with transparent, milestone-based pricing tailored to your project scope:

• **Websites & High-Conversion Landing Pages**: ₹45,000 – ₹85,000 ($600 – $1,100 USD) · 2–3 weeks delivery
• **Custom Web Applications & SaaS Dashboards**: ₹1,20,000 – ₹2,50,000 ($1,500 – $3,200 USD) · 4–8 weeks delivery
• **E-Commerce Platforms & Storefronts**: ₹65,000 – ₹1,40,000 ($850 – $1,800 USD) · 3–5 weeks delivery
• **Cross-Platform Mobile Apps (iOS & Android)**: from ₹1,50,000 ($1,900+ USD) · 6–10 weeks delivery
• **Cinema Brand Films & Commercials**: ₹75,000 – ₹1,80,000 ($950 – $2,300 USD) · 2–4 weeks delivery
• **Video Editing & Hollywood DaVinci Color**: ₹25,000 – ₹60,000 ($350 – $750 USD) · 1–2 weeks delivery
• **Viral Reels & Social Growth Retainer**: ₹30,000 – ₹65,000/month ($400 – $800/mo) · Ongoing

**Milestone Terms**: 40% project kickoff, 30% interactive prototype/alpha approval, and 30% final staging & production launch. All source code, design systems, and commercial IP rights are 100% yours upon delivery.`,
        actions: [
          { label: "⚡ Use Interactive Estimator", url: "/#estimator" },
          { label: "🔄 What is your development process?", prompt: "How does your development and design process work?" },
          { label: "📅 Book Discovery Call with Om", url: "/book" },
        ],
      };
    }

    // 3. Services & Capabilities
    if (
      q.includes("service") ||
      q.includes("what do you do") ||
      q.includes("capabilities") ||
      q.includes("offer") ||
      q.includes("what can you do") ||
      q.includes("what does") ||
      q.includes("pillar")
    ) {
      return {
        text: `OMCRE8 Studio is an independent multidisciplinary practice uniting 4 core pillars:

• **1. Digital Engineering & Architecture**: Custom React 19 & Next.js applications, high-concurrency REST APIs, sub-second edge performance, WCAG AA compliance, and custom SaaS dashboards.
• **2. Brand Identity & Visual Systems**: Typography systems, design tokens, interactive Figma UI/UX prototyping, and conversion-focused user journeys.
• **3. Cinema & Viral Video Production**: 4K commercial films, executive documentary treatments, and viral vertical 9:16 reels (with verified records of 992K+ and 178K+ views), graded in Hollywood DaVinci Resolve Studio.
• **4. Marketing & Audience Growth**: Data-backed social distribution, high-intent technical SEO, and conversion analytics.

Every engagement is personally architected and directed by founder Om Yadav.`,
        actions: [
          { label: "🛠️ What tech stack do you use?", prompt: "What tech stack and frameworks do you use?" },
          { label: "💰 View Pricing & Timelines", prompt: "What are your project pricing and timelines?" },
          { label: "📁 View Portfolio Work", url: "/work" },
        ],
      };
    }

    // 4. Founder Om Yadav
    if (
      q.includes("om yadav") ||
      q.includes("founder") ||
      q.includes("who founded") ||
      q.includes("who is") ||
      q.includes("director") ||
      q.includes("who runs")
    ) {
      return {
        text: `**${studio.founder}** is the founder, technology architect, and creative director of OMCRE8 Studio (OM CREATE STUDIO).

• **Multidisciplinary Leadership**: Om personally directs both sides of the studio—writing high-craft code and directing cinematic shoots.
• **Hands-On Client Model**: We don't employ junior account managers or sales middlemen. When you work with OMCRE8 Studio, Om personally architects your codebase and creative vision.
• **Personal Portfolio**: You can explore Om's personal work and background at [omyadav.online](${studio.personalSite}) or reach him directly via email at \`${studio.email}\`.

Would you like to schedule a direct 20-minute video discovery consultation with Om?`,
        actions: [
          { label: "📅 Book 20-Min Call with Om", url: "/book" },
          { label: "🌐 Visit omyadav.online", url: studio.personalSite },
          { label: "⚡ View Project Pricing", prompt: "What are your project pricing and timelines?" },
        ],
      };
    }

    // 5. Video, Cinema & Viral Reels Production
    if (
      q.includes("video") ||
      q.includes("film") ||
      q.includes("reel") ||
      q.includes("cinema") ||
      q.includes("shoot") ||
      q.includes("camera") ||
      q.includes("color") ||
      q.includes("davinci") ||
      q.includes("production") ||
      q.includes("editing")
    ) {
      return {
        text: `At OMCRE8 Studio, cinema is in our DNA. We merge engineering with high-craft video production:

• **Viral Vertical Reels**: We write hook-first scripts and shoot 9:16 vertical content optimized for Instagram algorithms. Our client reels have achieved 992,000+ views and 178,000+ organic views.
• **Commercial Brand Films**: 4K widescreen cinematic narratives showcasing your brand, products, or corporate leadership.
• **Hollywood Post-Production**: Full color grading in DaVinci Resolve Studio, custom sound design, pacing choreography, and dynamic typography animations.
• **In-Chamber & On-Location Shoots**: Professional cinema lighting rigs, wireless Sennheiser audio, and Sony FX3/RED camera packages.

Would you like to explore video production pricing or book a consultation?`,
        actions: [
          { label: "💰 View Video & Reel Pricing", prompt: "What are your project pricing and timelines?" },
          { label: "🎬 View Client Reels Strip", url: "/#reels" },
          { label: "📅 Book Call with Om", url: "/book" },
        ],
      };
    }

    // 6. Process, Workflow & Timelines
    if (
      q.includes("process") ||
      q.includes("workflow") ||
      q.includes("timeline") ||
      q.includes("turnaround") ||
      q.includes("how long") ||
      q.includes("how do you work") ||
      q.includes("how it works") ||
      q.includes("steps")
    ) {
      return {
        text: `Our projects follow a disciplined 4-phase agile delivery framework:

• **Phase 1: Discovery & Technical Architecture (Days 1–3)**: Scoping user journeys, drafting schema contracts, and choosing the optimal tech stack.
• **Phase 2: High-Fidelity Design & Prototyping (Week 1–2)**: Creating interactive Figma prototypes, design tokens, and typography scales for your review.
• **Phase 3: Sprint Engineering & Shoots (Weeks 2–6)**: Weekly milestone demos on live staging environments, iterative feedback, and video filming.
• **Phase 4: QA, Motion Polish & Production Deployment (Week 6+)**: Comprehensive Lighthouse audits (>95 score, <0.8s LCP), cross-browser verification, and zero-downtime launch.

We also offer post-launch maintenance and continuous feature iteration retainers.`,
        actions: [
          { label: "💰 View Project Pricing", prompt: "What are your project pricing and timelines?" },
          { label: "🛠️ What tech stack do you use?", prompt: "What tech stack and frameworks do you use?" },
          { label: "📅 Book Discovery Call", url: "/book" },
        ],
      };
    }

    // 7. Mobile Apps & Cross-Platform
    if (
      q.includes("mobile") ||
      q.includes("app") ||
      q.includes("ios") ||
      q.includes("android") ||
      q.includes("react native") ||
      q.includes("flutter")
    ) {
      return {
        text: `We develop high-performance cross-platform mobile apps for iOS and Android:

• **Technologies**: React Native, Flutter, Expo, TypeScript, and native Swift/Kotlin bridge modules.
• **Key Capabilities**: 60fps gesture-driven animations, offline-first data sync (WatermelonDB/SQLite), push notifications, biometric authentication (Face ID/Touch ID), and camera/audio integrations.
• **App Store Release**: We handle end-to-end App Store and Google Play submissions, compliance verification, and over-the-air updates.

Pricing starts from ₹1,50,000 ($1,900+ USD) depending on API complexity and integrations.`,
        actions: [
          { label: "⚡ Calculate in Estimator", url: "/#estimator" },
          { label: "🛠️ What is your web tech stack?", prompt: "What tech stack and frameworks do you use?" },
          { label: "📅 Book Discovery Call", url: "/book" },
        ],
      };
    }

    // 8. E-Commerce & Storefronts
    if (
      q.includes("ecommerce") ||
      q.includes("e-commerce") ||
      q.includes("store") ||
      q.includes("shopify") ||
      q.includes("shop") ||
      q.includes("checkout") ||
      q.includes("payment") ||
      q.includes("stripe") ||
      q.includes("razorpay")
    ) {
      return {
        text: `We build modern digital storefronts designed for high conversion and low drop-off:

• **Architectures**: Headless React / Next.js e-commerce connected to Shopify, Medusa, or custom Node.js/PostgreSQL backends.
• **Key Features**: Instant slide-out carts, editorial lookbook discovery, dynamic currency conversions, one-tap checkout, and integrated Stripe/Razorpay payment gateways.
• **Performance**: <0.8s page loads and optimized product catalog filtering, resulting in +30% to +50% conversion improvements over standard templates.`,
        actions: [
          { label: "⚡ Project Pricing", prompt: "What are your project pricing and timelines?" },
          { label: "📁 View Portfolio", url: "/work" },
          { label: "📅 Book Discovery Call", url: "/book" },
        ],
      };
    }

    // 9. AI Integrations & Automations
    if (
      q.includes("ai") ||
      q.includes("bot") ||
      q.includes("gpt") ||
      q.includes("gemini") ||
      q.includes("llm") ||
      q.includes("rag") ||
      q.includes("automation") ||
      q.includes("agent")
    ) {
      return {
        text: `We engineer production-ready AI workflows and autonomous agent systems:

• **RAG Knowledge Bases**: Custom retrieval-augmented generation systems allowing chatbots to answer questions based strictly on your company documents or product catalog.
• **LLM Integrations**: OpenAI GPT-4o, Anthropic Claude, and Google Gemini API integrations with prompt caching and latency optimization.
• **Automated Workflows**: Smart customer lead qualification, automated email routing, and intelligent CRM data sync.
• **Privacy-First**: Zero client data training retention and encrypted data storage.`,
        actions: [
          { label: "⚡ View Pricing", prompt: "What are your project pricing and timelines?" },
          { label: "🛠️ Full Tech Stack", prompt: "What tech stack and frameworks do you use?" },
          { label: "📅 Book Call with Om", url: "/book" },
        ],
      };
    }

    // 10. Booking, Contact & Calls
    if (
      q.includes("book") ||
      q.includes("call") ||
      q.includes("meeting") ||
      q.includes("calendly") ||
      q.includes("schedule") ||
      q.includes("contact") ||
      q.includes("hire") ||
      q.includes("email") ||
      q.includes("phone")
    ) {
      return {
        text: `You can schedule a direct 20-minute video discovery consultation with **${studio.founder}**:

• **What we discuss**: Your project goals, technical requirements, timeline constraints, budget scoping, and recommended architecture.
• **Booking Link**: Visit [/book](/book) to select a time that fits your calendar.
• **Direct Email**: You can also write to Om directly at \`${studio.email}\` or submit a brief at [/contact](/contact).`,
        actions: [
          { label: "📅 Open Live Calendar", url: "/book" },
          { label: "✉️ Submit Project Brief", url: "/contact" },
          { label: "⚡ Estimate Project Cost", url: "/#estimator" },
        ],
      };
    }

    // 11. True Legal Advice (Handled factually without dominating)
    if (q.includes("true legal") || q.includes("trulegaladvice") || q.includes("legal")) {
      return {
        text: `**True Legal Advice** (trulegaladvice.com) is one of our client case studies where OMCRE8 Studio engineered an accessible legal discovery platform and produced viral client reels reaching 992K+ views.

While legal tech was one of our successful client projects, OMCRE8 Studio works across diverse industries—including SaaS software, luxury e-commerce, commercial cinema, and fintech platforms.`,
        actions: [
          { label: "📁 View Portfolio Case Studies", url: "/work" },
          { label: "🛠️ What tech stack do you use?", prompt: "What tech stack and frameworks do you use?" },
          { label: "💰 View Pricing & Timelines", prompt: "What are your project pricing and timelines?" },
        ],
      };
    }

    // 12. Greetings
    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q.startsWith("hi ") ||
      q.startsWith("hello ") ||
      q.startsWith("hey ")
    ) {
      return {
        text: `Hello! Welcome to OMCRE8 Studio. I'm here to directly answer any questions about our digital engineering services, mobile apps, cinema production, pricing, tech stack, or booking a discovery call with founder Om Yadav.\n\nWhat can I help you explore?`,
        actions: [
          { label: "⚡ Project Pricing & Timelines", prompt: "What are your project pricing and timelines?" },
          { label: "🛠️ Tech Stack & Architecture", prompt: "What tech stack and frameworks do you use?" },
          { label: "🎥 Cinema & Viral Reels", prompt: "Tell me about your video production and viral reels capabilities" },
          { label: "📅 Book Discovery Call", url: "/book" },
        ],
      };
    }

    // 13. Default intelligent answer
    return {
      text: `Thanks for asking! OMCRE8 Studio is an independent multidisciplinary practice directed by **${studio.founder}**. We unite software architecture (React 19, TypeScript, cloud APIs, microservices) with cinematic film production, brand identity systems, and viral social growth.

Every project is delivered with sub-second performance, meticulous attention to detail, and direct founder collaboration.

Would you like me to estimate your project cost, explain our tech stack, or help you book a discovery call?`,
      actions: [
        { label: "⚡ View Pricing & Timelines", prompt: "What are your project pricing and timelines?" },
        { label: "🛠️ What tech stack do you use?", prompt: "What tech stack and frameworks do you use?" },
        { label: "🎥 Video & Reels Capabilities", prompt: "Tell me about your video production and viral reels capabilities" },
        { label: "📅 Book Discovery Call with Om", url: "/book" },
      ],
    };
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Try backend API first, fallback to intelligent local engine
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages.slice(-6) }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            sender: "assistant",
            text: data.reply || data.text,
            timestamp: new Date(),
            actions: data.actions,
          },
        ]);
        setIsTyping(false);
        return;
      }
    } catch {
      // Backend not running or in preview mode: use comprehensive local intelligence
    }

    // Fallback: local engine with realistic humanized delay
    setTimeout(() => {
      const result = generateLocalResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "assistant",
          text: result.text,
          timestamp: new Date(),
          actions: result.actions,
        },
      ]);
      setIsTyping(false);
    }, 350);
  };

  return (
    <>
      {/* Floating Launcher Trigger */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden cursor-pointer items-center gap-2 rounded-full border border-primary/30 bg-background/90 px-3.5 py-1.5 text-xs text-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary sm:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="font-medium">Ask Cre8 AI</span>
            <span className="text-muted-foreground">· Online</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close AI Assistant" : "Open OMMCRE8 AI Assistant"}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C59B4B] bg-[#0E1015] text-[#C59B4B] shadow-[0_0_28px_rgba(197,155,75,0.45)] transition-all duration-300 hover:scale-108 hover:bg-[#C59B4B] hover:text-[#08090B] focus:outline-none cursor-pointer"
        >
          {isOpen ? (
            <X size={22} className="relative z-10" />
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="font-mono text-[9px] font-black tracking-wider leading-none uppercase">
                ASK AI
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          className={`fixed bottom-22 right-5 z-40 flex flex-col overflow-hidden rounded-2xl border border-primary/30 bg-card/95 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
            isExpanded
              ? "h-[85vh] w-[92vw] max-w-2xl sm:h-[650px] sm:w-[580px]"
              : "h-[560px] w-[92vw] max-w-sm sm:w-[420px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/80 bg-ink/90 px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Bot size={17} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold tracking-wider">CRE8 STUDIO AI</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <p className="text-[10px] text-muted-foreground">Om Yadav & Studio Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden rounded p-1 hover:bg-secondary hover:text-foreground sm:block cursor-pointer"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: "cleared",
                      sender: "assistant",
                      text: "Chat refreshed. How can I help you today?",
                      timestamp: new Date(),
                      actions: [
                        { label: "⚡ Pricing & Timelines", prompt: "What are your project pricing and timelines?" },
                        { label: "🛠️ Tech Stack", prompt: "What tech stack and frameworks do you use?" },
                        { label: "📅 Book Discovery Call", url: "/book" },
                      ],
                    },
                  ]);
                }}
                className="rounded p-1 hover:bg-secondary hover:text-foreground cursor-pointer"
                title="Reset conversation"
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 hover:bg-secondary hover:text-foreground cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "assistant" && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Sparkles size={12} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/60 bg-secondary/50 text-foreground"
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {m.text.split("\n").map((line, i) => {
                      if (line.startsWith("• ")) {
                        return (
                          <div key={i} className="my-1 pl-2 font-normal text-muted-foreground">
                            • {line.slice(2)}
                          </div>
                        );
                      }
                      return (
                        <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                          {line}
                        </p>
                      );
                    })}
                  </div>

                  {/* Action suggestions / interactive follow-up chips */}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/40 pt-2.5">
                      {m.actions.map((act, idx) =>
                        act.prompt ? (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSend(act.prompt)}
                            className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-foreground transition-all hover:bg-primary/25 cursor-pointer shadow-sm"
                          >
                            {act.label}
                          </button>
                        ) : act.action ? (
                          <button
                            key={idx}
                            type="button"
                            onClick={act.action}
                            className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-foreground transition-all hover:bg-primary/25 cursor-pointer"
                          >
                            {act.label}
                          </button>
                        ) : act.url ? (
                          act.url.startsWith("/") ? (
                            <Link
                              key={idx}
                              to={act.url}
                              className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-foreground transition-all hover:bg-white/15 hover:border-primary/50"
                            >
                              {act.label} <ArrowUpRight size={11} />
                            </Link>
                          ) : (
                            <a
                              key={idx}
                              href={act.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-foreground transition-all hover:bg-white/15 hover:border-primary/50"
                            >
                              {act.label} <ArrowUpRight size={11} />
                            </a>
                          )
                        ) : null
                      )}
                    </div>
                  )}
                </div>

                {m.sender === "user" && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                    <User size={12} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Sparkles size={12} className="animate-spin" />
                </div>
                <div className="flex items-center gap-1 rounded-xl bg-secondary/60 px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="border-t border-border/40 bg-secondary/20 px-3 py-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="shrink-0 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-foreground cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-border/80 bg-background/90 p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, tech stack, pricing, video production..."
              className="flex-1 rounded-lg border border-border/80 bg-secondary/40 px-3 py-2 text-xs outline-none transition-colors focus:border-primary focus:bg-background"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
