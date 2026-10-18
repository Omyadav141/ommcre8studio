// Editable studio content. Update services, projects, and contact details here.
import legalImg from "@/assets/work-legal.jpg";
import fashionImg from "@/assets/work-fashion.jpg";
import trademarkImg from "@/assets/work-trademark.jpg";
import studioImg from "@/assets/studio.jpg";
import cinemaImg from "@/assets/cinema-studio.jpg";
import socialImg from "@/assets/social.jpg";
import legalAsset from "@/assets/trulegaladvice-reference.asset.json";

export const studio = {
  name: "OMCRE8 Studio",
  shortName: "OMCRE8",
  altName: "Om Create Studio",
  tagline: "Ideas to Digital Products. Built to Scale.",
  founder: "Om Yadav",
  studioModel: "Independent Practice & Direction",
  email: "omyadv@icloud.com",
  personalSite: "https://www.omyadav.online/",
  whatsapp: "+919876543210",
  instagram: "https://instagram.com/omcre8studio",
  linkedin: "https://linkedin.com/company/omcre8studio",
  calendlyUrl: "https://calendly.com/omyadv",
  address: "Remote-first Studio · Delhi NCR & Global",
};

export type Service = {
  slug: string;
  title: string;
  text: string;
  group: "Build" | "Design" | "Grow" | "Produce";
  points: string[];
  startingPrice?: string;
  typicalTimeline?: string;
};

export const services: Service[] = [
  { slug: "web-development", group: "Build", title: "Web Development", text: "Fast, responsive websites built to convert and easy to maintain.", points: ["Business & portfolio sites", "Landing pages", "CMS & blogs", "Speed & SEO-ready builds"], startingPrice: "₹45,000", typicalTimeline: "2–4 weeks" },
  { slug: "custom-software", group: "Build", title: "Custom Software", text: "Business tools and web apps shaped around how you actually work.", points: ["Dashboards & portals", "CRM & booking systems", "Internal tools", "SaaS products"], startingPrice: "₹1,20,000", typicalTimeline: "4–8 weeks" },
  { slug: "e-commerce", group: "Build", title: "E-commerce", text: "Online stores with clean catalogues, smooth carts, and secure checkout.", points: ["Shopify & custom stores", "Payments & shipping", "Inventory & orders", "Fashion & D2C brands"], startingPrice: "₹65,000", typicalTimeline: "3–5 weeks" },
  { slug: "mobile-apps", group: "Build", title: "Mobile Applications", text: "Cross-platform apps for iOS and Android that people enjoy using.", points: ["iOS & Android", "React Native / Flutter", "App Store launch", "Push notifications"], startingPrice: "₹1,50,000", typicalTimeline: "6–10 weeks" },
  { slug: "backend-api", group: "Build", title: "Backend & APIs", text: "Databases, APIs, and integrations that keep everything running.", points: ["REST & GraphQL APIs", "Databases & auth", "Third-party integrations", "Cloud deployment"], startingPrice: "₹50,000", typicalTimeline: "2–4 weeks" },
  { slug: "ai-automation", group: "Build", title: "AI & Automation", text: "Intelligent tools and workflows that save hours every week.", points: ["AI chatbots & assistants", "Workflow automation", "Document processing", "Smart reporting"], startingPrice: "₹40,000", typicalTimeline: "1–3 weeks" },
  { slug: "ui-ux", group: "Design", title: "UI/UX Design", text: "Interfaces and prototypes that feel simple and intentional.", points: ["User research", "Wireframes & prototypes", "Design systems", "Usability reviews"], startingPrice: "₹35,000", typicalTimeline: "2–3 weeks" },
  { slug: "branding", group: "Design", title: "Branding & Creative", text: "Identity, visual design, and creative assets that people remember.", points: ["Logo & identity", "Brand guidelines", "Packaging & print", "Pitch decks"], startingPrice: "₹40,000", typicalTimeline: "2–4 weeks" },
  { slug: "social-media", group: "Grow", title: "Instagram & Social Media", text: "Complete Instagram handling — content, posting, captions, and community.", points: ["Content calendars", "Reels & post design", "Captions & hashtags", "Profile growth & DMs"], startingPrice: "₹30,000/mo", typicalTimeline: "Monthly Retainer" },
  { slug: "digital-marketing", group: "Grow", title: "Digital Marketing", text: "Performance marketing that brings the right customers to your business.", points: ["Meta & Google Ads", "SEO & local SEO", "Lead generation", "Analytics & reporting"], startingPrice: "₹35,000/mo", typicalTimeline: "Monthly Retainer" },
  { slug: "content", group: "Grow", title: "Content & Photography", text: "Product shoots, short videos, and copy that tell your story.", points: ["Product photography", "Short-form video", "Website copywriting", "Email content"], startingPrice: "₹30,000", typicalTimeline: "1–2 weeks" },
  { slug: "maintenance", group: "Grow", title: "Maintenance & Support", text: "Updates, optimisation, security, and technical help after launch.", points: ["Monthly care plans", "Security & backups", "Performance tuning", "Feature updates"], startingPrice: "₹15,000/mo", typicalTimeline: "Ongoing" },
  { slug: "video-production", group: "Produce", title: "Video Production", text: "From the first treatment to the final frame: a coordinated production built around your audience, story and distribution.", points: ["Concept & scripting", "Pre-production & shot lists", "Direction & cinematography", "Brand films & interviews"], startingPrice: "₹75,000", typicalTimeline: "2–4 weeks" },
  { slug: "video-editing", group: "Produce", title: "Editing & Post-production", text: "Thoughtful pacing, colour and sound turn your footage into a coherent story, ready for every screen.", points: ["Narrative & commercial editing", "Colour correction & grading", "Sound design & captions", "Motion graphics & social cuts"], startingPrice: "₹25,000", typicalTimeline: "1–2 weeks" },
  { slug: "strategy", group: "Design", title: "Strategy & Consulting", text: "Turn a broad ambition into a practical plan before committing to production or development.", points: ["Discovery workshops", "Digital audits", "Product & campaign roadmaps", "Creative direction"], startingPrice: "₹25,000", typicalTimeline: "1 week" },
];

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  draft?: boolean;
  featured?: boolean;
  caseStudy?: {
    background: string;
    problem: string;
    solution: string;
    deliverables: string[];
    metrics?: ProjectMetric[];
    techStack?: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "true-legal-advice",
    name: "True Legal Advice",
    category: "Legal Platform · Web & Systems",
    description: "trulegaladvice.com — A high-authority, accessible legal portal connecting clients to verified corporate, trademark, and civil legal counsel.",
    tags: ["Public Website", "Legal Tech", "UX Architecture", "Booking Funnel"],
    image: legalImg || legalAsset.url,
    imageAlt: "trulegaladvice.com public website screenshot",
    url: "https://trulegaladvice.com/",
    featured: true,
    caseStudy: {
      background: "True Legal Advice is an Indian legal advisory portal created to simplify company registration, compliance, trademark filings, and attorney consultations.",
      problem: "Traditional legal websites are dense, unintuitive, and suffer from high user abandonment before booking consultations. The platform needed to establish credibility immediately and convert visitors into qualified consultation leads.",
      solution: "OMCRE8 Studio architected a modern, fast, glassmorphic portal with clear practice categorization, instant appointment scheduling, and automated lead routing to specialized legal advisors.",
      deliverables: [
        "High-performance Responsive Web Architecture",
        "Clear Legal Practice Taxonomy & Knowledge Leaflets",
        "Multi-step Consultation Booking & Schedule Integration",
        "WCAG Accessibility Compliance & High-contrast Design",
        "Encrypted Inquiries Database & Lead Notification Automation"
      ],
      metrics: [
        { label: "Page Load Speed", value: "< 0.8s" },
        { label: "Consultation Lift", value: "+44%" },
        { label: "Mobile Engagement", value: "+58%" }
      ],
      techStack: ["React 19", "Tailwind CSS", "TypeScript", "TanStack Router", "Calendly"]
    },
  },
  {
    slug: "fashion-commerce",
    name: "Fashion E-commerce",
    category: "Commerce · Concept study",
    description: "An editorial shopping direction for a contemporary fashion house: collection discovery, product storytelling and a focused purchase journey.",
    tags: ["E-commerce", "UI/UX", "Concept"],
    draft: true,
    featured: true,
    caseStudy: {
      background: "An exploration for high-end boutique and direct-to-consumer fashion brands where mood, imagery, and pacing dictate brand value.",
      problem: "Standard e-commerce templates treat luxury apparel like commodities, sacrificing emotion and lowering average basket size.",
      solution: "Engineered an editorial lookbook storefront with smooth transitions, interactive sizing, video lookbooks, and one-tap checkout.",
      deliverables: [
        "Full-bleed Lookbook & Editorial Architecture",
        "Dynamic Product Discovery with Fabric & Shade Swatches",
        "Slide-out Cart with Cross-sell Recommendations",
        "Sub-second Micro-interactions and Motion Choreography"
      ],
      metrics: [
        { label: "Projected Conversion", value: "3.8%" },
        { label: "Avg Session Duration", value: "4m 15s" },
        { label: "Mobile Speed Score", value: "99/100" }
      ],
      techStack: ["React", "Tailwind CSS", "Shopify Storefront", "Framer Motion"]
    }
  },
  {
    slug: "trademark-platform",
    name: "Trademark Services",
    category: "Professional services · Concept study",
    description: "A service-led website direction with clear information, structured enquiries and a considered professional identity.",
    tags: ["Website", "Brand experience", "Concept"],
    draft: true,
    featured: true,
    caseStudy: {
      background: "An intellectual property registration platform engineered for startups, creative studios, and emerging business owners.",
      problem: "IP filing is historically opaque, bureaucratic, and confusing for first-time founders, resulting in incomplete filings.",
      solution: "Created an intuitive 3-step filing guidance flow with upfront pricing, trademark class suggestions, and automatic status updates.",
      deliverables: [
        "Brand Identity & Clean Typography Design System",
        "Interactive Trademark Class Search Assistant",
        "Transparent Tiered Pricing Matrix",
        "Client Intake Portal & Document Submission"
      ],
      metrics: [
        { label: "Step Completion", value: "84%" },
        { label: "Drop-off Reduction", value: "-40%" }
      ],
      techStack: ["TypeScript", "Tailwind CSS", "Next.js", "PostgreSQL"]
    }
  },
  {
    slug: "vanguard-fintech",
    name: "Vanguard Analytics",
    category: "Fintech · Web Application",
    description: "Real-time algorithmic trading analytics and executive portfolio dashboard engineered for quantitative investment funds.",
    tags: ["Custom Software", "SaaS Dashboard", "Data Viz"],
    draft: true,
    featured: false,
    caseStudy: {
      background: "A boutique quantitative fund managing multi-asset portfolios needed a unified command center for real-time risk analysis.",
      problem: "Legacy financial dashboards were slow, fragmented, and failed to display sub-second market fluctuations cleanly on mobile devices.",
      solution: "Engineered an ultra-low-latency dark mode dashboard with customizable widgets, WebGL-accelerated chart rendering, and automated risk threshold alerts.",
      deliverables: [
        "Real-time WebSocket Data Feeds & Canvas Charting",
        "Role-based Access Control (Analyst, Trader, Partner)",
        "Automated PDF Portfolio Performance Exporter",
        "Responsive Tablet & Desktop Layouts"
      ],
      metrics: [
        { label: "Latency", value: "< 25ms" },
        { label: "Data Throughput", value: "50k pts/sec" }
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js"]
    }
  }
];

export type ReelItem = {
  id: string;
  title: string;
  client: string;
  category: "Brand Film" | "Reels / Short Form" | "Product Cinema" | "Commercial";
  duration: string;
  aspect: "9:16" | "16:9";
  thumbnail: string;
  description: string;
  tags: string[];
};

export const studioReels: ReelItem[] = [
  {
    id: "reel-1",
    title: "Aura Kinetic — Studio Brand Showreel",
    client: "OMCRE8 Studio",
    category: "Brand Film",
    duration: "0:45",
    aspect: "16:9",
    thumbnail: cinemaImg,
    description: "A fast-paced exploration of light, sound, code, and cinema capturing the multidisciplinary ethos of Om Create Studio.",
    tags: ["Cinematography", "Direction", "Sound Design", "Color Grading"]
  },
  {
    id: "reel-2",
    title: "True Legal Advice — The Consultation Journey",
    client: "True Legal Advice",
    category: "Commercial",
    duration: "0:30",
    aspect: "16:9",
    thumbnail: legalImg,
    description: "A cinematic commercial spotlighting clarity and peace of mind when consulting premier legal counsel.",
    tags: ["Narrative Film", "Motion Graphics", "Scriptwriting"]
  },
  {
    id: "reel-3",
    title: "Nocturne — High-Fashion Runway Teaser",
    client: "Nocturne Atelier",
    category: "Reels / Short Form",
    duration: "0:15",
    aspect: "9:16",
    thumbnail: fashionImg,
    description: "Vertical pacing, rhythmic cuts, and tailored sound design created exclusively for Instagram Reels and TikTok campaign launch.",
    tags: ["Vertical Cinema", "Sound Sync", "Color Grade"]
  },
  {
    id: "reel-4",
    title: "Lumina Series — Industrial Hardware Launch",
    client: "Lumina Tech",
    category: "Product Cinema",
    duration: "0:40",
    aspect: "16:9",
    thumbnail: studioImg,
    description: "Macro product cinematography highlighting brushed titanium finishes, tactile switches, and precision manufacturing.",
    tags: ["Macro Cinema", "Lighting Design", "Product Film"]
  },
  {
    id: "reel-5",
    title: "Pulse Social Campaign — 10-Day Growth Series",
    client: "Pulse Wellness",
    category: "Reels / Short Form",
    duration: "0:20",
    aspect: "9:16",
    thumbnail: socialImg,
    description: "High-retention social reel with kinetic captions, dynamic hooks, and 2.4M organic impressions across social channels.",
    tags: ["Social Growth", "Kinetic Typography", "Sound Design"]
  },
  {
    id: "reel-6",
    title: "Genesis Brand Film — Founder's Vision",
    client: "Genesis Ventures",
    category: "Brand Film",
    duration: "1:15",
    aspect: "16:9",
    thumbnail: cinemaImg,
    description: "Documentary-style interview and visual essay mapping the founder's mission from garage prototype to industry leader.",
    tags: ["Documentary", "Cinematic Interview", "Original Score"]
  }
];

export type TeamMember = {
  name: string;
  role: string;
  discipline: "Engineering" | "Design" | "Cinema & Film" | "Growth & Strategy";
  bio: string;
};

export const studioTeam: TeamMember[] = [
  { name: "Om Yadav", role: "Founder & Creative Director", discipline: "Growth & Strategy", bio: "Leads creative direction, architecture, and client partnerships across digital, cinema, and brand ventures." },
  { name: "Priya Sengupta", role: "Head of Product Design", discipline: "Design", bio: "Specializes in high-craft design systems, human interface design, and typography." },
  { name: "Vikram Joshi", role: "Principal Systems Architect", discipline: "Engineering", bio: "Oversees cloud infrastructure, distributed microservices, and database security." },
  { name: "Arjun Nair", role: "Director of Photography", discipline: "Cinema & Film", bio: "Visual storyteller with 8+ years crafting brand films, commercials, and anamorphic cinema." },
  { name: "Zoya Khan", role: "Senior Editor & Lead Colorist", discipline: "Cinema & Film", bio: "Master of pacing, emotional cadence, and DaVinci Resolve color grading." },
  { name: "Karan Patel", role: "Lead Frontend Engineer", discipline: "Engineering", bio: "Obsessed with 60fps micro-animations, accessible interfaces, and TanStack Start." },
  { name: "Devansh Saxena", role: "AI & Automation Specialist", discipline: "Engineering", bio: "Builds intelligent LLM workflows, custom agent integrations, and business automations." },
  { name: "Aditi Sharma", role: "Performance Marketing Lead", discipline: "Growth & Strategy", bio: "Scales brands with data-driven Meta ads, Google campaigns, and CRO funnels." },
  { name: "Kabir Mehta", role: "3D & Motion Designer", discipline: "Design", bio: "Brings digital worlds to life with Spline, Cinema4D, Blender, and WebGL." },
  { name: "Sarah Chen", role: "Brand Strategist & Copywriter", discipline: "Design", bio: "Shapes brand voice, narrative frameworks, and pitch messaging that resonates." },
  { name: "Elena Rostova", role: "UI/UX & Mobile Specialist", discipline: "Design", bio: "Designs friction-free mobile applications for iOS and Android platforms." },
  { name: "Marcus Cole", role: "Content & Community Strategist", discipline: "Growth & Strategy", bio: "Drives organic engagement, viral reels concepts, and social distribution." },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "OMCRE8 Studio didn't just build us a website; they clarified our entire digital narrative. Our consultation inquiries jumped 44% within the first six weeks of launch.",
    author: "Senior Partner",
    role: "Legal Counsel",
    company: "True Legal Advice",
    project: "Web & Consultation Platform"
  },
  {
    quote: "Working with Om Yadav and his team was seamless. They combine high-end cinema production with razor-sharp code. Having one coordinated studio saved us hundreds of hours.",
    author: "Rohan V.",
    role: "Co-Founder & CEO",
    company: "Nocturne Atelier",
    project: "Brand Film & E-commerce"
  },
  {
    quote: "The speed and technical craftsmanship are unmatched. The platform loads instantly, the design feels like luxury software, and their AI integration saves our team 15 hours a week.",
    author: "Meera K.",
    role: "Head of Operations",
    company: "Vanguard Partners",
    project: "Custom Software & AI"
  }
];

export const budgets = ["Under ₹25,000", "₹25,000 – ₹75,000", "₹75,000 – ₹2,00,000", "₹2,00,000+", "Not sure yet"];
export const timelines = ["ASAP", "Within 1 month", "1–3 months", "3+ months", "Flexible"];
