import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowUpRight,
  Calculator,
  Calendar,
  Layers,
  ChevronDown,
  Minimize2,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { studio, services, projects } from "@/lib/site";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
  actions?: { label: string; url?: string; action?: () => void }[] | undefined;
}

const quickPrompts = [
  "What does OMCRE8 Studio do?",
  "How was True Legal Advice built?",
  "Estimate my project cost & time",
  "Tell me about founder Om Yadav",
  "How do I book a discovery call?",
  "What are your video production capabilities?",
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
      text: `Hello! I'm the **OMCRE8 Studio AI Assistant**. I can help you explore our services, understand our work (like the **True Legal Advice** platform), estimate your project budget, or connect you directly with founder **${studio.founder}**. What are you looking to create?`,
      timestamp: new Date(),
      actions: [
        { label: "⚡ Estimate Project", url: "/#estimator" },
        { label: "📅 Book Call with Om", url: "/book" },
        { label: "📁 View True Legal Advice", url: "/work/true-legal-advice" },
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

  const generateLocalResponse = (prompt: string): { text: string; actions?: { label: string; url?: string; action?: () => void }[] | undefined } => {
    const q = prompt.toLowerCase();

    // True Legal Advice
    if (q.includes("true legal") || q.includes("trulegaladvice") || q.includes("legal")) {
      return {
        text: `**True Legal Advice** (trulegaladvice.com) is one of our flagship case studies. We engineered an authoritative, accessible legal advisory portal for Indian corporate law, trademark registration, and civil consultations.\n\nKey highlights:\n• Fast sub-second page loads (<0.8s LCP)\n• 44% increase in consultation inquiries\n• Built with React 19, TypeScript, and high-conversion appointment booking funnels.`,
        actions: [
          { label: "Read Case Study", url: "/work/true-legal-advice" },
          { label: "Visit Live Site", url: "https://trulegaladvice.com/" },
        ],
      };
    }

    // Founder / Om Yadav
    if (q.includes("om yadav") || q.includes("founder") || q.includes("who founded") || q.includes("who is")) {
      return {
        text: `**${studio.founder}** is the founder, technology architect, and creative director of OMCRE8 Studio (OM CREATE STUDIO). Om directs an independent multidisciplinary practice personally guiding software architecture, brand systems, cinema production, and viral growth.\n\nYou can explore his personal portfolio at [omyadav.online](${studio.personalSite}) or book a direct discovery call with him.`,
        actions: [
          { label: "Meet Om Yadav", url: "/founder" },
          { label: "Book a Call with Om", url: "/book" },
          { label: "Om's Personal Site", url: studio.personalSite },
        ],
      };
    }

    // Estimate / Cost / Pricing / Budget
    if (q.includes("cost") || q.includes("price") || q.includes("estimate") || q.includes("pricing") || q.includes("budget") || q.includes("fee") || q.includes("rate")) {
      return {
        text: `Our projects are tailored to your scope:\n\n• **Websites & Landing Pages**: from ₹45,000 (2–4 weeks)\n• **Custom Software & Portals**: from ₹1,20,000 (4–8 weeks)\n• **E-Commerce Stores**: from ₹65,000 (3–5 weeks)\n• **Mobile Apps**: from ₹1,50,000 (6–10 weeks)\n• **Film & Video Production**: from ₹75,000 (2–4 weeks)\n• **Video Editing & Post**: from ₹25,000\n• **Social Media Retainers**: from ₹30,000/mo\n\nTry our interactive estimator tool or get an exact proposal!`,
        actions: [
          { label: "⚡ Use Interactive Estimator", url: "/#estimator" },
          { label: "Submit Project Brief", url: "/contact" },
        ],
      };
    }

    // Booking / Call / Meeting
    if (q.includes("book") || q.includes("call") || q.includes("meeting") || q.includes("calendly") || q.includes("schedule") || q.includes("talk")) {
      return {
        text: `You can schedule a direct 20-minute discovery call with **${studio.founder}** on our live booking calendar. We'll discuss your goals, scope, timeline, and recommended technical approach.`,
        actions: [
          { label: "📅 Open Live Calendar", url: "/book" },
          { label: "✉️ Email Directly", url: `mailto:${studio.email}` },
        ],
      };
    }

    // Video / Film / Production / Reels
    if (q.includes("video") || q.includes("film") || q.includes("reel") || q.includes("cinema") || q.includes("production") || q.includes("shoot") || q.includes("edit")) {
      return {
        text: `At OMCRE8, film is in our DNA. We don't just write code; we direct, shoot, and edit cinematic brand films, high-retention Instagram reels, commercial ads, and product launch cinema.\n\nOur post-production pipeline includes DaVinci Resolve color grading, custom sound design, and vertical cuts tailored for social platforms.`,
        actions: [
          { label: "Explore Production", url: "/production" },
          { label: "View Showreels", url: "/work" },
        ],
      };
    }

    // Services / Capabilities
    if (q.includes("service") || q.includes("what do you do") || q.includes("capabilities") || q.includes("offer") || q.includes("stack")) {
      return {
        text: `OMCRE8 Studio covers the complete digital & creative spectrum across 4 pillars:\n\n1. **Build**: Web development, Custom software, E-commerce, Mobile apps, APIs & Backend.\n2. **Design**: UI/UX design, Brand identity, Creative strategy, Design systems.\n3. **Produce**: Brand films, Cinematography, Commercial editing, Color & Sound.\n4. **Grow**: Instagram & Reels management, Meta/Google ads, SEO, Content shoots.`,
        actions: [
          { label: "View All 15 Services", url: "/services" },
          { label: "Start a Project", url: "/contact" },
        ],
      };
    }

    // Default intelligent answer
    return {
      text: `Thanks for asking! OMCRE8 Studio is an independent multidisciplinary studio led by **${studio.founder}** with a 20-person core team. We merge high-craft engineering (React, TypeScript, cloud software) with cinematic film production and growth marketing.\n\nWould you like to scope a project, explore our case studies (like True Legal Advice), or book a discovery meeting?`,
      actions: [
        { label: "📅 Book a Discovery Call", url: "/book" },
        { label: "⚡ Calculate Project Cost", url: "/#estimator" },
        { label: "📁 Explore Portfolio", url: "/work" },
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
    }, 450);
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
              : "h-[560px] w-[92vw] max-w-sm sm:w-[410px]"
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
                <p className="text-[10px] text-muted-foreground">Om Yadav & Team Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden rounded p-1 hover:bg-secondary hover:text-foreground sm:block"
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
                    },
                  ]);
                }}
                className="rounded p-1 hover:bg-secondary hover:text-foreground"
                title="Reset conversation"
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 hover:bg-secondary hover:text-foreground"
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
                          <div key={i} className="my-0.5 pl-2 font-normal text-muted-foreground">
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

                  {/* Action suggestions */}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/40 pt-2.5">
                      {m.actions.map((act, idx) => (
                        act.url ? (
                          <Link
                            key={idx}
                            to={act.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-primary/20"
                          >
                            {act.label} <ArrowUpRight size={11} />
                          </Link>
                        ) : (
                          <button
                            key={idx}
                            onClick={act.action}
                            className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-primary/20"
                          >
                            {act.label}
                          </button>
                        )
                      ))}
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
                  className="shrink-0 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
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
              placeholder="Ask about projects, pricing, True Legal Advice..."
              className="flex-1 rounded-lg border border-border/80 bg-secondary/40 px-3 py-2 text-xs outline-none transition-colors focus:border-primary focus:bg-background"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
