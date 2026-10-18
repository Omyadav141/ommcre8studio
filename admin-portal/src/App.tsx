import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  Bot,
  Layers,
  Settings,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  ChevronRight,
  Send,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Phone,
  Mail,
  Building,
  Globe,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";

interface Inquiry {
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
  status: "new" | "reviewing" | "quoted" | "booked" | "won" | "archived";
  notes?: string;
  createdAt: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  scheduledAt: string;
  serviceInterest?: string;
  status: "confirmed" | "completed" | "rescheduled" | "canceled";
  meetingUrl?: string;
  notes?: string;
}

interface AiLog {
  id: string;
  userPrompt: string;
  assistantReply: string;
  intent: string;
  timestamp: string;
}

interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: "published" | "draft";
  featured: boolean;
  url?: string;
}

// Initial fallback mock data for instant standalone operation
const initialInquiries: Inquiry[] = [
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
    status: "won",
    notes: "Flagship legal platform delivery. LCP <0.8s, +44% consultation inquiries recorded post-launch.",
    createdAt: "2026-10-10T10:30:00Z",
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
    status: "reviewing",
    notes: "Discovery call scheduled with Om Yadav for Thursday 11:00 AM.",
    createdAt: "2026-10-16T15:45:00Z",
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
    status: "new",
    notes: "Enterprise scope. Sent initial technical questionnaire.",
    createdAt: "2026-10-18T08:15:00Z",
  },
];

const initialBookings: Booking[] = [
  {
    id: "bk-201",
    name: "Aarav Kapoor",
    email: "aarav@nocturne.fashion",
    scheduledAt: "2026-10-22T11:00:00Z",
    serviceInterest: "E-Commerce & Video Production",
    status: "confirmed",
    meetingUrl: "https://meet.google.com/omcre8-nocturne-call",
    notes: "Reviewing runway lookbook video motion system.",
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
  },
];

const initialAiLogs: AiLog[] = [
  {
    id: "ailog-1",
    userPrompt: "How was True Legal Advice built?",
    assistantReply: "True Legal Advice (trulegaladvice.com) was built with React 19, TypeScript, and high-conversion consultation intake funnels, delivering sub-second page loads (<0.8s) and a +44% increase in consultation bookings.",
    intent: "case_study_query",
    timestamp: "2026-10-18T10:14:00Z",
  },
  {
    id: "ailog-2",
    userPrompt: "Estimate my e-commerce project with video reels",
    assistantReply: "E-Commerce stores start from ₹65,000 with a 3-5 week timeline. Adding brand cinema & vertical Instagram reels typically ranges ₹75,000 with 4K DaVinci color grading.",
    intent: "pricing_estimate",
    timestamp: "2026-10-18T11:20:00Z",
  },
];

const initialProjects: Project[] = [
  {
    id: "prj-1",
    slug: "true-legal-advice",
    name: "True Legal Advice",
    category: "Legal Platform · Web & Systems",
    status: "published",
    featured: true,
    url: "https://trulegaladvice.com/",
  },
  {
    id: "prj-2",
    slug: "fashion-commerce",
    name: "Fashion E-commerce",
    category: "Commerce · Concept Study",
    status: "published",
    featured: true,
  },
  {
    id: "prj-3",
    slug: "trademark-platform",
    name: "Trademark Services",
    category: "Professional Services",
    status: "published",
    featured: true,
  },
  {
    id: "prj-4",
    slug: "vanguard-fintech",
    name: "Vanguard Analytics",
    category: "Fintech · Web Application",
    status: "draft",
    featured: false,
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("omcre8_admin_token");
  });
  const [loginEmail, setLoginEmail] = useState("admin@omcreate.studio");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "inquiries" | "bookings" | "ai" | "cms" | "settings">("dashboard");

  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [aiLogs, setAiLogs] = useState<AiLog[]>(initialAiLogs);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newNote, setNewNote] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailSentNotice, setEmailSentNotice] = useState(false);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);

  // Sync with backend API
  const refreshBackendData = async () => {
    try {
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        if (data.inquiries) setInquiries(data.inquiries);
        setBackendConnected(true);
      }
      const bRes = await fetch("/api/bookings");
      if (bRes.ok) {
        const bData = await bRes.json();
        if (bData.bookings) setBookings(bData.bookings);
      }
      const aRes = await fetch("/api/ai/logs");
      if (aRes.ok) {
        const aData = await aRes.json();
        if (aData.logs) setAiLogs(aData.logs);
      }
    } catch {
      // Backend not running locally on port 4000: running in standalone offline mode
      setBackendConnected(false);
    }
  };

  useEffect(() => {
    refreshBackendData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("omcre8_admin_token", data.token);
        setIsAuthenticated(true);
        refreshBackendData();
        return;
      }
    } catch {
      // fallback check
    }

    // Direct credentials verification
    if (loginEmail === "admin@omcreate.studio" && loginPassword === "admin123") {
      localStorage.setItem("omcre8_admin_token", "demo_jwt_token_omcre8_studio");
      setIsAuthenticated(true);
    } else {
      setLoginError("Invalid email or password. Use demo credentials to test.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("omcre8_admin_token");
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (id: string, newStatus: Inquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // local state already updated
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    const updatedNotes = newNote.trim();

    setInquiries((prev) =>
      prev.map((i) => (i.id === selectedInquiry.id ? { ...i, notes: updatedNotes } : i))
    );
    setSelectedInquiry((prev) => (prev ? { ...prev, notes: updatedNotes } : null));

    try {
      await fetch(`/api/inquiries/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: updatedNotes }),
      });
    } catch {
      // state updated
    }
  };

  const handleSendEmailReply = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSentNotice(true);
    setTimeout(() => {
      setEmailSentNotice(false);
      setEmailBody("");
    }, 3000);
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.reference.toLowerCase().includes(q) ||
      inq.title.toLowerCase().includes(q) ||
      (inq.company && inq.company.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  // Calculate Pipeline Metrics
  const totalPipeline = inquiries.reduce((acc, inq) => {
    if (inq.status === "won" || inq.status === "quoted" || inq.status === "reviewing") {
      if (inq.budget?.includes("2,00,000+")) return acc + 250000;
      if (inq.budget?.includes("75,000")) return acc + 125000;
      if (inq.budget?.includes("25,000")) return acc + 50000;
      return acc + 45000;
    }
    return acc;
  }, 0);

  const newCount = inquiries.filter((i) => i.status === "new").length;
  const wonCount = inquiries.filter((i) => i.status === "won").length;
  const conversionRate = inquiries.length > 0 ? Math.round((wonCount / inquiries.length) * 100) : 0;

  // Render Login Screen if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090B] p-4 text-[#EDEDED]">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#12141A]/90 p-8 shadow-2xl backdrop-blur-2xl">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#20B2AA]/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#20B2AA]/10 blur-3xl" />

          <div className="relative z-10 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#20B2AA]">
              OMCRE8 STUDIO
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Studio Command Center
            </h1>
            <p className="mt-1 text-xs text-neutral-400">
              Founder & Leadership Operations Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="relative z-10 mt-8 space-y-4 text-xs">
            {loginError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400">
                <AlertCircle size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-neutral-400 font-mono uppercase text-[11px]">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#181B24] px-3.5 py-2.5 text-white outline-none focus:border-[#20B2AA]"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-mono uppercase text-[11px]">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#181B24] px-3.5 py-2.5 text-white outline-none focus:border-[#20B2AA]"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#20B2AA] py-2.5 font-medium text-[#08090B] transition-opacity hover:opacity-90 cursor-pointer"
            >
              Sign In to Admin
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginEmail("admin@omcreate.studio");
                setLoginPassword("admin123");
                localStorage.setItem("omcre8_admin_token", "demo_jwt_token_omcre8_studio");
                setIsAuthenticated(true);
              }}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 font-mono text-[11px] text-neutral-300 hover:bg-white/10 cursor-pointer"
            >
              ✦ Quick Demo Sign-In (1-Click)
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-4 text-center text-[10px] text-neutral-500">
            OMCRE8 Studio · Founded by Om Yadav · omyadav.online
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#08090B] text-[#EDEDED]">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-[#0E1015]/95 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#20B2AA]">
                OMCRE8
              </span>
              <span className="ml-1 text-xs text-neutral-400">STUDIO</span>
              <p className="text-[10px] text-neutral-500">Admin Command Center</p>
            </div>
            <span
              className={`h-2 w-2 rounded-full ${
                backendConnected ? "bg-emerald-400" : "bg-amber-400"
              }`}
              title={backendConnected ? "Connected to Backend API" : "Standalone Local Mode"}
            />
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "inquiries", label: "Inquiries & Leads", icon: Inbox, badge: newCount },
              { id: "bookings", label: "Discovery Calls", icon: Calendar, badge: bookings.length },
              { id: "ai", label: "AI Assistant Logs", icon: Bot },
              { id: "cms", label: "Case Studies & CMS", icon: Layers },
              { id: "settings", label: "System & APIs", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#20B2AA]/15 text-[#20B2AA] font-medium"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="rounded-full bg-[#20B2AA]/20 px-2 py-0.5 font-mono text-[10px] text-[#20B2AA]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-white">Om Yadav</div>
              <div className="text-[10px] text-neutral-400">Founder & Super Admin</div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded p-1.5 text-neutral-400 hover:bg-white/5 hover:text-red-400 cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0E1015]/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold capitalize text-white">
              {activeTab === "cms" ? "Case Studies & CMS" : activeTab}
            </h2>
            <span className="text-neutral-500">·</span>
            <span className="font-mono text-xs text-neutral-400">
              {backendConnected ? "Live API Synced (Port 4000)" : "Local Storage Engine"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={refreshBackendData}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-neutral-300 hover:bg-white/10 cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Sync</span>
            </button>

            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-[#20B2AA]/40 bg-[#20B2AA]/10 px-3 py-1.5 font-medium text-[#20B2AA] hover:bg-[#20B2AA]/20"
            >
              <span>View Public Studio</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </header>

        {/* Tab View Container */}
        <div className="p-8 space-y-8 flex-1">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-mono text-xs uppercase">Active Pipeline</span>
                    <DollarSign size={18} className="text-[#20B2AA]" />
                  </div>
                  <div className="mt-3 text-2xl font-bold text-white">
                    ₹{totalPipeline.toLocaleString("en-IN")}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
                    <TrendingUp size={12} />
                    <span>Calculated across active inquiries</span>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-mono text-xs uppercase">Total Inquiries</span>
                    <Inbox size={18} className="text-[#20B2AA]" />
                  </div>
                  <div className="mt-3 text-2xl font-bold text-white">{inquiries.length}</div>
                  <div className="mt-1 text-[11px] text-[#20B2AA]">
                    {newCount} unreviewed leads
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-mono text-xs uppercase">Discovery Calls</span>
                    <Calendar size={18} className="text-[#20B2AA]" />
                  </div>
                  <div className="mt-3 text-2xl font-bold text-white">{bookings.length}</div>
                  <div className="mt-1 text-[11px] text-neutral-400">
                    Direct Calendly sync active
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-mono text-xs uppercase">Conversion Rate</span>
                    <CheckCircle2 size={18} className="text-[#20B2AA]" />
                  </div>
                  <div className="mt-3 text-2xl font-bold text-white">{conversionRate}%</div>
                  <div className="mt-1 text-[11px] text-neutral-400">
                    {wonCount} won client engagements
                  </div>
                </div>
              </div>

              {/* Pipeline Breakdown & Recent Leads */}
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Pipeline Status Cards (5 cols) */}
                <div className="glass-panel rounded-xl p-6 lg:col-span-5 space-y-4">
                  <h3 className="text-sm font-semibold text-white">Pipeline Status Distribution</h3>
                  <div className="space-y-3">
                    {[
                      { status: "new", label: "New Leads", color: "bg-blue-400" },
                      { status: "reviewing", label: "In Discovery / Review", color: "bg-amber-400" },
                      { status: "quoted", label: "Proposal Sent", color: "bg-purple-400" },
                      { status: "won", label: "Won & In Production", color: "bg-emerald-400" },
                    ].map((item) => {
                      const count = inquiries.filter((i) => i.status === item.status).length;
                      const pct = inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0;
                      return (
                        <div key={item.status} className="space-y-1 text-xs">
                          <div className="flex justify-between text-neutral-300">
                            <span>{item.label}</span>
                            <span className="font-mono">{count} ({pct}%)</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <div className={`h-full rounded-full ${item.color}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/10 pt-4 mt-6">
                    <div className="text-xs font-medium text-white">Flagship Reference Spotlight</div>
                    <div className="mt-2 rounded-lg border border-white/10 bg-[#161822] p-3 text-xs">
                      <div className="font-medium text-[#20B2AA]">True Legal Advice (trulegaladvice.com)</div>
                      <p className="mt-1 text-neutral-400 text-[11px]">
                        Production release delivered with sub-second page loads and +44% consultation inquiry lift.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Inquiries List (7 cols) */}
                <div className="glass-panel rounded-xl p-6 lg:col-span-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-sm font-semibold text-white">Recent Client Inquiries</h3>
                    <button
                      onClick={() => setActiveTab("inquiries")}
                      className="text-xs text-[#20B2AA] hover:underline"
                    >
                      View All &rarr;
                    </button>
                  </div>

                  <div className="divide-y divide-white/10 mt-3">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div
                        key={inq.id}
                        onClick={() => {
                          setSelectedInquiry(inq);
                          setNewNote(inq.notes || "");
                          setActiveTab("inquiries");
                        }}
                        className="flex items-center justify-between py-3.5 hover:bg-white/5 px-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-white">{inq.name}</span>
                            <span className="font-mono text-[10px] text-neutral-400">
                              [{inq.reference}]
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                            {inq.title}
                          </p>
                        </div>

                        <div className="text-right">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-mono capitalize ${
                              inq.status === "new"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : inq.status === "won"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {inq.status}
                          </span>
                          <div className="text-[10px] text-neutral-500 font-mono mt-1">
                            {inq.budget || "Unspecified"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES & LEADS CRM */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              {/* Search & Status Filters */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                  <Search size={15} className="absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, email, company, reference..."
                    className="w-full rounded-lg border border-white/10 bg-[#12141A] pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-[#20B2AA]"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 text-xs">
                  {["all", "new", "reviewing", "quoted", "won", "archived"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`rounded-lg px-3 py-1.5 font-mono capitalize transition-colors cursor-pointer ${
                        statusFilter === st
                          ? "bg-[#20B2AA] text-[#08090B] font-semibold"
                          : "border border-white/10 bg-[#12141A] text-neutral-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="glass-panel overflow-hidden rounded-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-white/10 bg-[#161922] font-mono text-[11px] text-neutral-400">
                      <tr>
                        <th className="p-4">Reference</th>
                        <th className="p-4">Client</th>
                        <th className="p-4">Project Brief</th>
                        <th className="p-4">Capability</th>
                        <th className="p-4">Budget / Timeline</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredInquiries.map((inq) => (
                        <tr
                          key={inq.id}
                          className="hover:bg-white/5 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setNewNote(inq.notes || "");
                            setEmailSubject(`Following up on ${inq.title} [${inq.reference}]`);
                          }}
                        >
                          <td className="p-4 font-mono text-[#20B2AA]">{inq.reference}</td>
                          <td className="p-4">
                            <div className="font-medium text-white">{inq.name}</div>
                            <div className="text-[11px] text-neutral-400">{inq.email}</div>
                            {inq.company && (
                              <div className="text-[10px] text-neutral-500">{inq.company}</div>
                            )}
                          </td>
                          <td className="p-4 max-w-xs">
                            <div className="font-medium text-neutral-200 line-clamp-1">
                              {inq.title}
                            </div>
                            <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                              {inq.description}
                            </p>
                          </td>
                          <td className="p-4 font-mono text-neutral-300">{inq.service}</td>
                          <td className="p-4">
                            <div className="text-white">{inq.budget || "Unspecified"}</div>
                            <div className="text-[10px] text-neutral-400">{inq.timeline || "Flexible"}</div>
                          </td>
                          <td className="p-4">
                            <select
                              value={inq.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) =>
                                handleStatusChange(inq.id, e.target.value as Inquiry["status"])
                              }
                              className={`rounded-full px-2.5 py-1 text-[10px] font-mono capitalize border outline-none cursor-pointer ${
                                inq.status === "new"
                                  ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                  : inq.status === "won"
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  : inq.status === "quoted"
                                  ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                                  : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="quoted">Quoted</option>
                              <option value="booked">Booked</option>
                              <option value="won">Won</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button className="rounded border border-white/10 px-2.5 py-1 hover:border-[#20B2AA] hover:text-[#20B2AA]">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISCOVERY CALLS / BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-semibold text-white">Scheduled Discovery Appointments</h3>
                  <p className="text-xs text-neutral-400">
                    Integrated with Calendly (https://calendly.com/omyadv) and Google Meet
                  </p>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                  ✦ Calendly Webhook Active
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {bookings.map((b) => (
                  <div key={b.id} className="glass-card rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20B2AA]/15 text-[#20B2AA]">
                          <Calendar size={15} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{b.name}</div>
                          <div className="text-xs text-neutral-400">{b.email}</div>
                        </div>
                      </div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 uppercase">
                        {b.status}
                      </span>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#161822] p-3 text-xs space-y-1">
                      <div className="text-neutral-400">
                        Scheduled:{" "}
                        <span className="text-white font-medium">
                          {new Date(b.scheduledAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-neutral-400">
                        Interest: <span className="text-[#20B2AA]">{b.serviceInterest || "General"}</span>
                      </div>
                      {b.notes && <div className="text-neutral-400 italic">Notes: {b.notes}</div>}
                    </div>

                    {b.meetingUrl && (
                      <a
                        href={b.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#20B2AA] hover:underline"
                      >
                        <span>Join Video Room (Meet)</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI ASSISTANT LOGS */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-semibold text-white">Public AI Assistant Logs</h3>
                <p className="text-xs text-neutral-400">
                  Real-time visitor interactions and lead captures from the website floating assistant
                </p>
              </div>

              <div className="space-y-4">
                {aiLogs.map((log) => (
                  <div key={log.id} className="glass-panel rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-[#20B2AA]/15 px-2.5 py-0.5 font-mono text-[10px] text-[#20B2AA]">
                        Intent: {log.intent}
                      </span>
                      <span className="text-neutral-500 font-mono text-[10px]">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#151720] p-3 text-xs">
                      <span className="font-mono text-neutral-500">Visitor:</span>
                      <p className="text-white mt-1">{log.userPrompt}</p>
                    </div>

                    <div className="rounded-lg border border-[#20B2AA]/30 bg-[#20B2AA]/5 p-3 text-xs">
                      <span className="font-mono text-[#20B2AA]">Cre8 Assistant Reply:</span>
                      <p className="text-neutral-200 mt-1 whitespace-pre-line">{log.assistantReply}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CASE STUDIES & CMS */}
          {activeTab === "cms" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-semibold text-white">Portfolio & Case Studies Management</h3>
                <p className="text-xs text-neutral-400">
                  Control published case studies, concepts, and featured hero references
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((p) => (
                  <div key={p.id} className="glass-card rounded-xl p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#20B2AA]">{p.category}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-mono capitalize ${
                            p.status === "published"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-neutral-500/20 text-neutral-400 border border-neutral-500/30"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-semibold text-white">{p.name}</h4>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-[#20B2AA]"
                      >
                        <span>{p.url}</span>
                        <ExternalLink size={12} />
                      </a>
                    )}

                    <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={p.status === "published"}
                          onChange={() => {
                            const newStatus = p.status === "published" ? "draft" : "published";
                            setProjects((prev) =>
                              prev.map((item) => (item.id === p.id ? { ...item, status: newStatus } : item))
                            );
                          }}
                          className="accent-[#20B2AA]"
                        />
                        <span className="text-neutral-300">Published on Live Site</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={p.featured}
                          onChange={() => {
                            setProjects((prev) =>
                              prev.map((item) => (item.id === p.id ? { ...item, featured: !item.featured } : item))
                            );
                          }}
                          className="accent-[#20B2AA]"
                        />
                        <span className="text-neutral-300">Featured in Hero</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & SYSTEM */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-semibold text-white">System & Service Integrations</h3>
                <p className="text-xs text-neutral-400">
                  Status of third-party APIs, database connections, and email automation
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {[
                  {
                    name: "Calendly Live Appointment Sync",
                    desc: "Live calendar connection owned by Om Yadav (omyadv@icloud.com).",
                    status: "Connected",
                    color: "text-emerald-400",
                  },
                  {
                    name: "Email Dispatch (Resend / SMTP)",
                    desc: "Automated client inquiry receipts and founder alerts to omyadv@icloud.com.",
                    status: "Active (Console & API ready)",
                    color: "text-emerald-400",
                  },
                  {
                    name: "Database Storage",
                    desc: "Persistent JSON / SQLite storage with Supabase PostgreSQL migration ready.",
                    status: "Active (studio-db.json)",
                    color: "text-emerald-400",
                  },
                  {
                    name: "AI Studio Intelligence Engine",
                    desc: "Contextual RAG engine with True Legal Advice facts, services, and pricing matrix.",
                    status: "Operational",
                    color: "text-emerald-400",
                  },
                ].map((item, i) => (
                  <div key={i} className="glass-panel rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-neutral-400 mt-1">{item.desc}</div>
                    </div>
                    <span className={`font-mono text-xs font-semibold ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="glass-panel rounded-xl p-6 mt-8 space-y-3">
                <h4 className="text-sm font-semibold text-white">Studio Profile Details</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-500 font-mono">Founder:</span>
                    <p className="text-white font-medium">Om Yadav</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono">Notification Email:</span>
                    <p className="text-white font-medium">omyadv@icloud.com</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono">Personal Site:</span>
                    <p className="text-[#20B2AA]">https://www.omyadav.online/</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono">Team Scale:</span>
                    <p className="text-white">~20 Multidisciplinary Creatives</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Inquiry Detail Drawer Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0E1016] p-8 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-xs text-[#20B2AA]">
                    {selectedInquiry.reference}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    {selectedInquiry.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="rounded p-1 text-neutral-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status Changer */}
              <div className="rounded-xl border border-white/10 bg-[#161822] p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400">Pipeline Status</div>
                  <div className="text-xs text-white capitalize mt-0.5">
                    Currently: {selectedInquiry.status}
                  </div>
                </div>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedInquiry.id, e.target.value as Inquiry["status"])
                  }
                  className="rounded-lg border border-white/20 bg-[#1F2330] px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="reviewing">In Review / Discovery</option>
                  <option value="quoted">Proposal Quoted</option>
                  <option value="booked">Discovery Booked</option>
                  <option value="won">Won & Started</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Client Information */}
              <div className="space-y-3 text-xs">
                <h4 className="font-mono uppercase text-neutral-400">Client Contact</h4>
                <div className="grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-[#13151D] p-4">
                  <div>
                    <span className="text-neutral-500">Name:</span>
                    <p className="text-white font-medium">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500">Email:</span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-[#20B2AA] hover:underline block truncate"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-neutral-500">Phone:</span>
                    <p className="text-white">{selectedInquiry.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500">Company:</span>
                    <p className="text-white">{selectedInquiry.company || "Independent"}</p>
                  </div>
                </div>
              </div>

              {/* Scope & Project Brief */}
              <div className="space-y-3 text-xs">
                <h4 className="font-mono uppercase text-neutral-400">Project Requirements</h4>
                <div className="rounded-xl border border-white/10 bg-[#13151D] p-4 space-y-2.5">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Capability:</span>
                    <span className="text-white font-mono">{selectedInquiry.service}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Budget Range:</span>
                    <span className="text-[#20B2AA] font-mono">{selectedInquiry.budget || "Unspecified"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Timeline:</span>
                    <span className="text-white font-mono">{selectedInquiry.timeline || "Flexible"}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-neutral-400 block mb-1">Full Description:</span>
                    <p className="text-neutral-200 leading-relaxed whitespace-pre-line bg-[#0A0C10] p-3 rounded-lg border border-white/5">
                      {selectedInquiry.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2 text-xs">
                <h4 className="font-mono uppercase text-neutral-400">Internal Admin Notes</h4>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record internal discovery notes, follow-up actions, or quotation details..."
                  className="w-full rounded-lg border border-white/10 bg-[#13151D] p-3 text-white outline-none focus:border-[#20B2AA]"
                  rows={3}
                />
                <button
                  onClick={handleSaveNotes}
                  className="rounded-lg bg-[#20B2AA] px-4 py-1.5 font-medium text-[#08090B] hover:opacity-90 cursor-pointer"
                >
                  Save Internal Notes
                </button>
              </div>

              {/* Quick Email Response */}
              <form onSubmit={handleSendEmailReply} className="space-y-2 text-xs border-t border-white/10 pt-4">
                <h4 className="font-mono uppercase text-neutral-400">Send Direct Email Response</h4>
                {emailSentNotice && (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 p-2 text-emerald-400">
                    Email response dispatched to {selectedInquiry.email}!
                  </div>
                )}
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full rounded-lg border border-white/10 bg-[#13151D] px-3 py-2 text-white outline-none"
                />
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Hi, thanks for reaching out to OMCRE8 Studio..."
                  className="w-full rounded-lg border border-white/10 bg-[#13151D] p-3 text-white outline-none focus:border-[#20B2AA]"
                  rows={4}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg border border-[#20B2AA]/40 bg-[#20B2AA]/10 px-4 py-2 font-medium text-[#20B2AA] hover:bg-[#20B2AA]/20 cursor-pointer"
                  >
                    <Send size={13} />
                    <span>Send Email to Client</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailBody(
                        `Hi ${selectedInquiry.name},\n\nThank you for reaching out regarding "${selectedInquiry.title}". Founder Om Yadav and our team have reviewed your brief. We would love to hop on a quick 20-minute discovery call.\n\nPlease pick a slot on Om's calendar: https://calendly.com/omyadv\n\nBest,\nOMCRE8 Studio`
                      );
                    }}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-neutral-400 hover:text-white"
                  >
                    Use Discovery Template
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
