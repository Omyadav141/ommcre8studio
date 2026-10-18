import { db } from "../db";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AiResponse {
  reply: string;
  intent: string;
  actions?: { label: string; url?: string }[];
}

const studioContext = `
You are the AI Assistant for OMCRE8 Studio (also known as Om Create Studio), an independent multidisciplinary digital product and creative production agency founded by Om Yadav.
Founder: Om Yadav. Portfolio: https://www.omyadav.online/. Email: omyadv@icloud.com.
Studio Model: Independent multidisciplinary practice directed by Om Yadav, uniting software architecture, UI/UX systems, cinema production, DaVinci Resolve color grading, and viral social growth.
Location: Remote-first, based in Delhi NCR, working with clients in India, USA, Singapore, UK.
Capabilities (4 pillars):
1. Build: Web development, custom web applications, SaaS dashboards, E-commerce (Shopify/Headless), Mobile apps (React Native), Backend APIs.
2. Design: UI/UX design, Brand identity, Design systems, Usability research.
3. Produce: Brand films, Cinematography, Commercial video editing, Color grading, Sound design, Motion graphics, 9:16 Instagram Reels.
4. Grow: Instagram & social media management, Meta & Google Ads, Performance marketing, Content photography.

Flagship Case Studies:
- True Legal Advice (trulegaladvice.com): Authoritative digital legal advisory portal with practice area taxonomy, automated appointment scheduling, and sub-second page loads (<0.8s LCP), yielding +44% increase in consultation inquiries.
- Fashion E-commerce (Nocturne): Luxury lookbook discovery and one-tap checkout with vertical runway reels.
- Trademark Services (TrademarkFlow): Intuitive 3-step trademark search and IP filing portal.
- Vanguard Analytics: Low-latency algorithmic fintech trading dashboard.

Pricing Guidance:
- Websites & Landing Pages: from ₹45,000 (2–4 weeks)
- Custom Web Apps & Software: from ₹1,20,000 (4–8 weeks)
- E-Commerce Stores: from ₹65,000 (3–5 weeks)
- Mobile Applications: from ₹1,50,000 (6–10 weeks)
- Film & Cinema Production: from ₹75,000 (2–4 weeks)
- Video Editing: from ₹25,000 (1–2 weeks)
- Social Media / Reels Retainer: from ₹30,000/month

Discovery Calls:
Clients can schedule a direct 20-minute video discovery call with Om Yadav at https://calendly.com/omyadv or visit /book.
`;

export class AiService {
  private openAiKey?: string;
  private geminiKey?: string;

  constructor() {
    this.openAiKey = process.env.OPENAI_API_KEY;
    this.geminiKey = process.env.GEMINI_API_KEY;
  }

  public async processChat(
    userMessage: string,
    sessionId: string = "default",
    history: { sender: string; text: string }[] = []
  ): Promise<AiResponse> {
    const q = userMessage.toLowerCase();

    // 1. Check if OpenAI API key is configured
    if (this.openAiKey) {
      try {
        const messages: ChatMessage[] = [
          { role: "system", content: studioContext },
          ...history.map((h) => ({
            role: (h.sender === "user" ? "user" : "assistant") as "user" | "assistant",
            content: h.text,
          })),
          { role: "user", content: userMessage },
        ];

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.7,
            max_tokens: 350,
          }),
        });

        if (res.ok) {
          const data = (await res.json()) as any;
          const reply = data.choices[0]?.message?.content || "How else can I assist you?";
          db.logAiChat({ sessionId, userPrompt: userMessage, assistantReply: reply, intent: "llm_openai" });
          return {
            reply,
            intent: "llm_openai",
            actions: [
              { label: "Book Call with Om", url: "/book" },
              { label: "View Portfolio", url: "/work" },
            ],
          };
        }
      } catch (e) {
        console.warn("OpenAI API call failed, using built-in intelligence engine:", e);
      }
    }

    // 2. Built-in Multi-Intent Intelligence Engine
    let intent = "general";
    let reply = "";
    let actions: { label: string; url?: string }[] = [];

    if (q.includes("true legal") || q.includes("trulegaladvice") || q.includes("legal")) {
      intent = "case_study_legal";
      reply = `**True Legal Advice** (trulegaladvice.com) is one of OMCRE8 Studio's flagship platforms. We transformed a traditional legal information service into an ultra-fast, high-converting digital advisory portal.\n\n• **Core Results**: <0.8s LCP page load, +44% increase in consultation inquiries, and a 31% reduction in mobile bounce rate.\n• **Tech Stack**: React 19, TypeScript, Tailwind CSS, TanStack Start, and encrypted inquiries schema.`;
      actions = [
        { label: "Read Case Study", url: "/work/true-legal-advice" },
        { label: "Visit trulegaladvice.com", url: "https://trulegaladvice.com/" },
      ];
    } else if (q.includes("om yadav") || q.includes("founder") || q.includes("who is")) {
      intent = "founder_inquiry";
      reply = `**Om Yadav** is the founder, technology architect, and creative director of OMCRE8 Studio (OM CREATE STUDIO). Directing an independent multidisciplinary practice, Om personally oversees strategy, architecture, cinematography, and client growth.\n\nYou can explore his personal portfolio at omyadav.online or book a direct discovery meeting with him.`;
      actions = [
        { label: "Meet Om Yadav", url: "/founder" },
        { label: "Book a 20-Min Call", url: "/book" },
        { label: "omyadav.online", url: "https://www.omyadav.online/" },
      ];
    } else if (
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("estimate") ||
      q.includes("budget") ||
      q.includes("rate")
    ) {
      intent = "pricing_estimate";
      reply = `Our project scopes are transparent and milestone-based:\n\n• **Websites & Landing Pages**: ₹45,000 – ₹85,000 (2–4 weeks)\n• **Custom Web Apps & Software**: ₹1,20,000 – ₹2,20,000 (4–8 weeks)\n• **E-Commerce Stores**: ₹65,000 – ₹1,30,000 (3–5 weeks)\n• **Mobile Apps (iOS & Android)**: from ₹1,50,000 (6–10 weeks)\n• **Film & Brand Video Production**: from ₹75,000 (2–4 weeks)\n• **Instagram Reels & Social Retainer**: from ₹30,000/month\n\nYou can calculate your custom package on our interactive estimator!`;
      actions = [
        { label: "Use Interactive Estimator", url: "/#estimator" },
        { label: "Submit Project Brief", url: "/contact" },
      ];
    } else if (q.includes("book") || q.includes("call") || q.includes("meeting") || q.includes("calendly") || q.includes("schedule")) {
      intent = "booking";
      reply = `You can book a 20-minute video discovery meeting directly on Om Yadav's live calendar. We will review your goals, discuss technical feasibility, and prepare an actionable scope proposal.`;
      actions = [
        { label: "Open Live Calendar", url: "/book" },
        { label: "Email Directly", url: "mailto:omyadv@icloud.com" },
      ];
    } else if (q.includes("video") || q.includes("film") || q.includes("reel") || q.includes("cinema") || q.includes("shoot") || q.includes("edit")) {
      intent = "film_production";
      reply = `OMCRE8 Studio provides full-service cinema and motion production. We don't just write code; our team includes directors of photography, DaVinci Resolve colorists, and sound designers crafting 4K widescreen brand films, vertical Instagram reels, and macro product cinema.`;
      actions = [
        { label: "Explore Production", url: "/production" },
        { label: "Watch Showreels", url: "/work" },
      ];
    } else if (q.includes("team") || q.includes("how many") || q.includes("people") || q.includes("who works")) {
      intent = "team_query";
      reply = `OMCRE8 Studio operates as an independent multidisciplinary practice directed by Om Yadav, collaborating directly with specialized craft leads across Software Architecture, UI/UX Design, Cinematography, DaVinci Color Grading, and Social Media Virality.`;
      actions = [
        { label: "Meet Om & Studio", url: "/about" },
        { label: "Start a Project", url: "/contact" },
      ];
    } else {
      intent = "general_studio";
      reply = `Welcome to OMCRE8 Studio! Founded by Om Yadav, we merge high-craft digital engineering (React 19, TypeScript, scalable backends) with cinematic film production and growth marketing.\n\nWould you like to explore our case studies (like True Legal Advice), estimate a project, or schedule a discovery call with Om?`;
      actions = [
        { label: "Calculate Project Cost", url: "/#estimator" },
        { label: "Explore Case Studies", url: "/work" },
        { label: "Book a Discovery Call", url: "/book" },
      ];
    }

    db.logAiChat({
      sessionId,
      userPrompt: userMessage,
      assistantReply: reply,
      intent,
    });

    return { reply, intent, actions };
  }
}

export const aiService = new AiService();
