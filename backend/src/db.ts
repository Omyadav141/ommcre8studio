import fs from "fs";
import path from "path";

export interface Inquiry {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  service: string;
  title: string;
  description: string;
  budget?: string;
  timeline?: string;
  contactPref?: string;
  consent: boolean;
  status: "new" | "reviewing" | "quoted" | "booked" | "won" | "archived";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  scheduledAt: string;
  serviceInterest?: string;
  status: "confirmed" | "completed" | "rescheduled" | "canceled";
  meetingUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface AiLog {
  id: string;
  sessionId: string;
  userPrompt: string;
  assistantReply: string;
  intent: string;
  timestamp: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  featured: boolean;
  status: "published" | "draft";
  url?: string;
}

export interface DatabaseSchema {
  inquiries: Inquiry[];
  bookings: Booking[];
  aiLogs: AiLog[];
  projects: ProjectItem[];
}

const DB_FILE = path.resolve(__dirname, "../../data/studio-db.json");

// Default initial seed data
const initialData: DatabaseSchema = {
  inquiries: [
    {
      id: "inq-101",
      reference: "OCS-2026-8841",
      name: "Adv. Rajesh Malhotra",
      email: "rajesh@truelegaladvice.com",
      phone: "+91 98110 54321",
      company: "True Legal Advice Partners",
      website: "https://trulegaladvice.com",
      service: "web-development",
      title: "Comprehensive Legal Portal & Consultation Intake Engine",
      description: "We require an end-to-end editorial web portal restructuring our legal practice areas, lawyer appointment calendars, and encrypted client case intake.",
      budget: "₹2,00,000+",
      timeline: "Within 1 month",
      contactPref: "Email",
      consent: true,
      status: "won",
      notes: "Flagship legal platform delivery. LCP <0.8s, +44% consultation inquiries recorded post-launch.",
      createdAt: "2026-10-10T10:30:00Z",
      updatedAt: "2026-10-15T14:20:00Z",
    },
    {
      id: "inq-102",
      reference: "OCS-2026-9214",
      name: "Aarav Kapoor",
      email: "aarav@nocturne.fashion",
      phone: "+91 99201 12345",
      company: "Nocturne Atelier",
      website: "https://nocturne-concept.com",
      service: "e-commerce",
      title: "Luxury D2C Fashion Storefront & Lookbook Video Cinema",
      description: "Looking for an editorial lookbook storefront with smooth shopping cart transitions and 9:16 vertical runway reels.",
      budget: "₹75,000 – ₹2,00,000",
      timeline: "1–3 months",
      contactPref: "Video call",
      consent: true,
      status: "reviewing",
      notes: "Discovery call scheduled with Om Yadav for Thursday.",
      createdAt: "2026-10-16T15:45:00Z",
      updatedAt: "2026-10-17T09:10:00Z",
    },
    {
      id: "inq-103",
      reference: "OCS-2026-9430",
      name: "Siddharth Verma",
      email: "siddharth@trademarkflow.in",
      phone: "+91 97112 99887",
      company: "TrademarkFlow",
      service: "custom-software",
      title: "Automated Trademark Search & Filing Application",
      description: "Need a modern SaaS dashboard for founders to check trademark classification, pay government fees, and track IP application status.",
      budget: "₹2,00,000+",
      timeline: "ASAP",
      contactPref: "WhatsApp",
      consent: true,
      status: "new",
      notes: "High potential enterprise lead. Follow up with scope breakdown.",
      createdAt: "2026-10-18T08:15:00Z",
      updatedAt: "2026-10-18T08:15:00Z",
    },
  ],
  bookings: [
    {
      id: "bk-201",
      name: "Aarav Kapoor",
      email: "aarav@nocturne.fashion",
      scheduledAt: "2026-10-22T11:00:00Z",
      serviceInterest: "E-Commerce & Video Production",
      status: "confirmed",
      meetingUrl: "https://meet.google.com/omcre8-nocturne-call",
      notes: "Discuss luxury lookbook motion system and runway cuts.",
      createdAt: "2026-10-17T09:12:00Z",
    },
    {
      id: "bk-202",
      name: "Adv. Rajesh Malhotra",
      email: "rajesh@truelegaladvice.com",
      scheduledAt: "2026-10-12T14:30:00Z",
      serviceInterest: "Web Development & Booking Funnel",
      status: "completed",
      meetingUrl: "https://meet.google.com/omcre8-legal-portal",
      notes: "Platform launched successfully. Discussing phase 2 retainer.",
      createdAt: "2026-10-08T16:00:00Z",
    },
  ],
  aiLogs: [
    {
      id: "ailog-1",
      sessionId: "session-abc-1",
      userPrompt: "How was True Legal Advice built?",
      assistantReply: "True Legal Advice (trulegaladvice.com) was built with React 19, TypeScript, and high-conversion consultation intake funnels, delivering sub-second page loads (<0.8s) and a +44% increase in consultation bookings.",
      intent: "case_study_query",
      timestamp: "2026-10-18T10:14:00Z",
    },
  ],
  projects: [
    {
      id: "prj-1",
      slug: "true-legal-advice",
      name: "True Legal Advice",
      category: "Legal Platform · Web & Systems",
      description: "An authoritative digital legal advisory portal connecting clients to verified corporate and trademark counsel.",
      tags: ["Public Website", "Legal Tech", "UX Architecture"],
      featured: true,
      status: "published",
      url: "https://trulegaladvice.com/",
    },
    {
      id: "prj-2",
      slug: "fashion-commerce",
      name: "Fashion E-commerce",
      category: "Commerce · Concept Study",
      description: "An editorial shopping direction for a contemporary fashion house.",
      tags: ["E-commerce", "Luxury UI/UX", "Shopify"],
      featured: true,
      status: "published",
    },
    {
      id: "prj-3",
      slug: "trademark-platform",
      name: "Trademark Services",
      category: "Professional Services",
      description: "A service-led website and portal for trademark filing and IP protection.",
      tags: ["Website", "Brand Experience"],
      featured: true,
      status: "published",
    },
  ],
};

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, "utf-8");
        return JSON.parse(content);
      }
    } catch (e) {
      console.warn("Using in-memory seed database:", e);
    }
    this.saveData(initialData);
    return JSON.parse(JSON.stringify(initialData));
  }

  private saveData(data: DatabaseSchema) {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (e) {
      console.warn("Failed to persist database to file, continuing in-memory:", e);
    }
  }

  // --- Inquiries ---
  public getInquiries(filter?: { status?: string; search?: string }): Inquiry[] {
    let result = [...this.data.inquiries];
    if (filter?.status && filter.status !== "all") {
      result = result.filter((i) => i.status === filter.status);
    }
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(s) ||
          i.email.toLowerCase().includes(s) ||
          i.reference.toLowerCase().includes(s) ||
          i.title.toLowerCase().includes(s) ||
          (i.company && i.company.toLowerCase().includes(s))
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getInquiryById(id: string): Inquiry | undefined {
    return this.data.inquiries.find((i) => i.id === id || i.reference === id);
  }

  public createInquiry(input: Omit<Inquiry, "id" | "reference" | "status" | "createdAt" | "updatedAt">): Inquiry {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const reference = `OCS-${new Date().getFullYear()}-${randomHex}`;
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      reference,
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...input,
    };
    this.data.inquiries.unshift(newInquiry);
    this.saveData(this.data);
    return newInquiry;
  }

  public updateInquiry(id: string, updates: Partial<Inquiry>): Inquiry | null {
    const index = this.data.inquiries.findIndex((i) => i.id === id || i.reference === id);
    if (index === -1) return null;
    const current = this.data.inquiries[index]!;
    const updated: Inquiry = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.data.inquiries[index] = updated;
    this.saveData(this.data);
    return updated;
  }

  public deleteInquiry(id: string): boolean {
    const initialLen = this.data.inquiries.length;
    this.data.inquiries = this.data.inquiries.filter((i) => i.id !== id && i.reference !== id);
    if (this.data.inquiries.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Bookings ---
  public getBookings(): Booking[] {
    return [...this.data.bookings].sort(
      (a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    );
  }

  public createBooking(booking: Omit<Booking, "id" | "createdAt">): Booking {
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...booking,
    };
    this.data.bookings.unshift(newBooking);
    this.saveData(this.data);
    return newBooking;
  }

  public updateBooking(id: string, updates: Partial<Booking>): Booking | null {
    const index = this.data.bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;
    const updated: Booking = {
      ...this.data.bookings[index]!,
      ...updates,
    };
    this.data.bookings[index] = updated;
    this.saveData(this.data);
    return updated;
  }

  // --- AI Logs ---
  public logAiChat(log: Omit<AiLog, "id" | "timestamp">): AiLog {
    const newLog: AiLog = {
      id: `ailog-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...log,
    };
    this.data.aiLogs.unshift(newLog);
    if (this.data.aiLogs.length > 500) {
      this.data.aiLogs = this.data.aiLogs.slice(0, 500);
    }
    this.saveData(this.data);
    return newLog;
  }

  public getAiLogs(limit = 50): AiLog[] {
    return this.data.aiLogs.slice(0, limit);
  }

  // --- Projects ---
  public getProjects(): ProjectItem[] {
    return this.data.projects;
  }

  public updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem | null {
    const index = this.data.projects.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) return null;
    const updated = { ...this.data.projects[index]!, ...updates };
    this.data.projects[index] = updated;
    this.saveData(this.data);
    return updated;
  }

  // --- Analytics ---
  public getAnalytics() {
    const totalInquiries = this.data.inquiries.length;
    const newLeads = this.data.inquiries.filter((i) => i.status === "new").length;
    const wonProjects = this.data.inquiries.filter((i) => i.status === "won").length;
    const bookedCalls = this.data.bookings.length;

    // Service breakdown
    const serviceBreakdown: Record<string, number> = {};
    for (const inq of this.data.inquiries) {
      serviceBreakdown[inq.service] = (serviceBreakdown[inq.service] || 0) + 1;
    }

    // Status breakdown
    const statusBreakdown: Record<string, number> = {};
    for (const inq of this.data.inquiries) {
      statusBreakdown[inq.status] = (statusBreakdown[inq.status] || 0) + 1;
    }

    // Estimated pipeline value
    let pipelineValue = 0;
    for (const inq of this.data.inquiries) {
      if (inq.status === "won" || inq.status === "quoted" || inq.status === "reviewing") {
        if (inq.budget?.includes("2,00,000+")) pipelineValue += 250000;
        else if (inq.budget?.includes("75,000")) pipelineValue += 125000;
        else if (inq.budget?.includes("25,000")) pipelineValue += 50000;
        else pipelineValue += 45000;
      }
    }

    return {
      totalInquiries,
      newLeads,
      wonProjects,
      bookedCalls,
      pipelineValue,
      conversionRate: totalInquiries > 0 ? Math.round((wonProjects / totalInquiries) * 100) : 0,
      serviceBreakdown,
      statusBreakdown,
      recentActivity: this.data.inquiries.slice(0, 5),
    };
  }
}

export const db = new Database();
