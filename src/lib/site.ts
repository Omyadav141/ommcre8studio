// Editable studio content. Update services, projects, and contact details here.
import legalAsset from "@/assets/trulegaladvice-reference.asset.json";

export const studio = {
  name: "OMCRE8 Studio",
  founder: "Om Yadav",
  teamSize: "~20",
  email: "omyadv@icloud.com",
  personalSite: "https://www.omyadav.online/",
  whatsapp: "", // e.g. "919999999999" — add to enable WhatsApp link
  instagram: "",
  linkedin: "",
};

export type Service = { slug: string; title: string; text: string; group: "Build" | "Design" | "Grow" | "Produce"; points: string[] };
export const services: Service[] = [
  { slug: "web-development", group: "Build", title: "Web Development", text: "Fast, responsive websites built to convert and easy to maintain.", points: ["Business & portfolio sites", "Landing pages", "CMS & blogs", "Speed & SEO-ready builds"] },
  { slug: "custom-software", group: "Build", title: "Custom Software", text: "Business tools and web apps shaped around how you actually work.", points: ["Dashboards & portals", "CRM & booking systems", "Internal tools", "SaaS products"] },
  { slug: "e-commerce", group: "Build", title: "E-commerce", text: "Online stores with clean catalogues, smooth carts, and secure checkout.", points: ["Shopify & custom stores", "Payments & shipping", "Inventory & orders", "Fashion & D2C brands"] },
  { slug: "mobile-apps", group: "Build", title: "Mobile Applications", text: "Cross-platform apps for iOS and Android that people enjoy using.", points: ["iOS & Android", "React Native / Flutter", "App Store launch", "Push notifications"] },
  { slug: "backend-api", group: "Build", title: "Backend & APIs", text: "Databases, APIs, and integrations that keep everything running.", points: ["REST & GraphQL APIs", "Databases & auth", "Third-party integrations", "Cloud deployment"] },
  { slug: "ai-automation", group: "Build", title: "AI & Automation", text: "Intelligent tools and workflows that save hours every week.", points: ["AI chatbots & assistants", "Workflow automation", "Document processing", "Smart reporting"] },
  { slug: "ui-ux", group: "Design", title: "UI/UX Design", text: "Interfaces and prototypes that feel simple and intentional.", points: ["User research", "Wireframes & prototypes", "Design systems", "Usability reviews"] },
  { slug: "branding", group: "Design", title: "Branding & Creative", text: "Identity, visual design, and creative assets that people remember.", points: ["Logo & identity", "Brand guidelines", "Packaging & print", "Pitch decks"] },
  { slug: "social-media", group: "Grow", title: "Instagram & Social Media", text: "Complete Instagram handling — content, posting, captions, and community.", points: ["Content calendars", "Reels & post design", "Captions & hashtags", "Profile growth & DMs"] },
  { slug: "digital-marketing", group: "Grow", title: "Digital Marketing", text: "Performance marketing that brings the right customers to your business.", points: ["Meta & Google Ads", "SEO & local SEO", "Lead generation", "Analytics & reporting"] },
  { slug: "content", group: "Grow", title: "Content & Photography", text: "Product shoots, short videos, and copy that tell your story.", points: ["Product photography", "Short-form video", "Website copywriting", "Email content"] },
  { slug: "maintenance", group: "Grow", title: "Maintenance & Support", text: "Updates, optimisation, security, and technical help after launch.", points: ["Monthly care plans", "Security & backups", "Performance tuning", "Feature updates"] },
  { slug: "video-production", group: "Produce", title: "Video Production", text: "From the first treatment to the final frame: a coordinated production built around your audience, story and distribution.", points: ["Concept & scripting", "Pre-production & shot lists", "Direction & cinematography", "Brand films & interviews"] },
  { slug: "video-editing", group: "Produce", title: "Editing & Post-production", text: "Thoughtful pacing, colour and sound turn your footage into a coherent story, ready for every screen.", points: ["Narrative & commercial editing", "Colour correction & grading", "Sound design & captions", "Motion graphics & social cuts"] },
  { slug: "strategy", group: "Design", title: "Strategy & Consulting", text: "Turn a broad ambition into a practical plan before committing to production or development.", points: ["Discovery workshops", "Digital audits", "Product & campaign roadmaps", "Creative direction"] },
];

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
  caseStudy?: { background: string; problem: string; solution: string; deliverables: string[] };
};
export const projects: Project[] = [
  {
    slug: "true-legal-advice",
    name: "True Legal Advice",
    category: "Legal information · Website reference",
    description: "trulegaladvice.com — the supplied legal-services website reference. Project scope and studio credits are awaiting confirmation.",
    tags: ["Public website", "Reference"],
    image: legalAsset.url,
    imageAlt: "trulegaladvice.com public website screenshot",
    url: "https://trulegaladvice.com/",
  },
  {
    slug: "fashion-commerce",
    name: "Fashion E-commerce",
    category: "Commerce · Concept study",
    description: "An editorial shopping direction for a fashion brand: collection discovery, product storytelling and a focused purchase journey.",
    tags: ["E-commerce", "UI/UX", "Concept"],
    draft: true,
  },
  {
    slug: "trademark-platform",
    name: "Trademark Services",
    category: "Professional services · Concept study",
    description: "A service-led website direction with clear information, structured enquiries and a considered professional identity.",
    tags: ["Website", "Brand experience", "Concept"],
    draft: true,
  },
];

export const budgets = ["Under ₹25,000", "₹25,000 – ₹75,000", "₹75,000 – ₹2,00,000", "₹2,00,000+", "Not sure yet"];
export const timelines = ["ASAP", "Within 1 month", "1–3 months", "3+ months", "Flexible"];
