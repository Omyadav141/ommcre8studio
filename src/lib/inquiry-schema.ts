import { z } from "zod";
import { budgets, services, timelines } from "@/lib/site";

export const inquirySchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).default(""),
  company: z.string().trim().max(120).default(""),
  website: z.string().trim().max(255).refine(v => !v || /^https?:\/\//.test(v) && URL.canParse(v), "Use a full http or https address").default(""),
  service: z.string().refine(v => v === "other" || services.some(s => s.slug === v), "Choose a service"),
  title: z.string().trim().min(1, "Give your project a title").max(150),
  description: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(3000),
  budget: z.string().refine(v => !v || budgets.includes(v), "Choose a listed budget").default(""),
  timeline: z.string().refine(v => !v || timelines.includes(v), "Choose a listed timeline").default(""),
  contactPref: z.enum(["Email", "Phone", "WhatsApp", "Video call"]),
  consent: z.literal("on", { errorMap: () => ({ message: "Please agree to be contacted" }) }),
  honeypot: z.string().max(0).default(""),
});