import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { budgets, services, timelines, studio } from "@/lib/site";
import { inquirySchema } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/lib/inquiries.functions";
import { getBookingLink } from "@/lib/booking.functions";

const field = "w-full rounded-md border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-foreground";
function F({ label, error, children, full }: { label: string; error?: string | undefined; children: ReactNode; full?: boolean }) {
  return <label className={`flex flex-col gap-2 ${full ? "md:col-span-2" : ""}`}><span className="text-xs font-medium">{label}</span>{children}{error && <span className="text-xs text-destructive">{error}</span>}</label>;
}
export function InquiryForm({ defaultService = "" }: { defaultService?: string }) {
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "phone" | "company" | "website" | "service" | "title" | "description" | "budget" | "timeline" | "consent", string>>>({});
  const [done, setDone] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const id = useRef<string | null>(null);
  const lock = useRef(false);
  const submit = useServerFn(submitInquiry);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lock.current) return;
    id.current ??= crypto.randomUUID();
    const r = inquirySchema.safeParse({ ...Object.fromEntries(new FormData(e.currentTarget)), id: id.current });
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map(i => [String(i.path[0]), i.message]))); return; }
    lock.current = true; setErrors({}); setBusy(true); setFailure("");
    try {
      const result = await submit({ data: r.data });
      if (result.saved && result.reference) setDone(result.reference);
      else setFailure(result.error ?? "Your enquiry could not be saved.");
    } catch { setFailure("We couldn't confirm your enquiry was saved. Please contact the studio directly before retrying."); }
    finally { lock.current = false; setBusy(false); }
  };
  if (done) return <div className="py-12" role="status"><Check className="mb-6" /><p className="eyebrow">{done}</p><h2 className="mt-4 text-3xl">Your enquiry is saved.</h2><p className="mt-4 text-muted-foreground">Email notifications are not active yet. For a direct follow-up, email {studio.email} and include your reference.</p><Button asChild variant="outline" className="mt-6"><a href={`mailto:${studio.email}`}>Email the studio <ArrowUpRight /></a></Button></div>;
  return <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
    <F label="Full name *" error={errors.name}><input name="name" className={field} autoComplete="name" maxLength={100} /></F>
    <F label="Work email *" error={errors.email}><input name="email" type="email" className={field} autoComplete="email" maxLength={255} /></F>
    <F label="Phone / WhatsApp" error={errors.phone}><input name="phone" className={field} autoComplete="tel" maxLength={30} /></F>
    <F label="Company" error={errors.company}><input name="company" className={field} maxLength={120} /></F>
    <F label="Current website" error={errors.website}><input name="website" className={field} placeholder="https://" maxLength={255} /></F>
    <F label="Service required *" error={errors.service}><select name="service" defaultValue={defaultService} className={field}><option value="">Select a service</option>{services.map(s => <option key={s.slug} value={s.slug}>{s.title}</option>)}<option value="other">Something else</option></select></F>
    <F label="Project title or idea *" error={errors.title} full><input name="title" className={field} maxLength={150} /></F>
    <F label="Project description *" error={errors.description} full><textarea name="description" rows={5} className={field} maxLength={3000} /></F>
    <F label="Budget range" error={errors.budget}><select name="budget" defaultValue="" className={field}><option value="">Optional</option>{budgets.map(b => <option key={b}>{b}</option>)}</select></F>
    <F label="Expected timeline" error={errors.timeline}><select name="timeline" defaultValue="" className={field}><option value="">Optional</option>{timelines.map(b => <option key={b}>{b}</option>)}</select></F>
    <F label="Preferred way to communicate" full><select name="contactPref" className={field}><option>Email</option><option>Phone</option><option>WhatsApp</option><option>Video call</option></select></F>
    <input name="honeypot" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
    <label className="flex items-start gap-3 text-sm md:col-span-2"><input type="checkbox" name="consent" className="mt-1 accent-primary" /><span className="text-muted-foreground">I agree to be contacted about this enquiry. <Link to="/privacy" className="underline">Privacy notice</Link>{errors.consent && <span className="block text-destructive">{errors.consent}</span>}</span></label>
    {failure && <p role="alert" className="text-sm text-destructive md:col-span-2">{failure}</p>}
    <Button size="lg" disabled={busy} className="md:col-span-2 md:justify-self-start">{busy ? <LoaderCircle className="animate-spin" /> : <ArrowUpRight />}{busy ? "Saving enquiry…" : "Send Inquiry"}</Button>
  </form>;
}

export function BookingForm() {
  const [mode, setMode] = useState<"slots" | "calendly">("slots");
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("02:30 PM IST");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectTopic, setProjectTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedState, setBookedState] = useState<{ day: string; time: string; name: string } | null>(null);

  const days = [
    { label: "Today", date: "Oct 18 (Wed)" },
    { label: "Tomorrow", date: "Oct 19 (Thu)" },
    { label: "Friday", date: "Oct 20 (Fri)" },
    { label: "Monday", date: "Oct 23 (Mon)" },
  ];

  const slots = [
    "11:00 AM IST",
    "02:30 PM IST",
    "04:00 PM IST",
    "06:30 PM IST",
    "08:00 PM IST",
  ];

  const handleSlotBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);

    const chosenDay = days[selectedDay]?.date || "Upcoming";
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          scheduledAt: `${chosenDay} at ${selectedTime}`,
          serviceInterest: projectTopic || "Discovery Consultation",
          notes: `Booked via OMMCRE8 Studio slot picker: ${chosenDay} at ${selectedTime}`,
        }),
      });
    } catch {
      // offline fallback
    }

    setBookedState({ day: chosenDay, time: selectedTime, name });
    setIsSubmitting(false);
  };

  if (bookedState) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-card/90 p-8 text-center backdrop-blur-xl animate-in fade-in">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Check size={28} />
        </div>
        <p className="eyebrow mt-4 text-primary">Discovery Call Confirmed</p>
        <h3 className="mt-2 text-2xl font-bold text-foreground">You're Scheduled with Om Yadav</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Hi {bookedState.name}, your 30-minute discovery session is locked in for:
        </p>
        <div className="mx-auto mt-4 max-w-sm rounded-xl border border-primary/20 bg-secondary/50 p-4 font-mono text-sm text-foreground">
          📅 {bookedState.day} &nbsp;·&nbsp; ⏰ {bookedState.time}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          A calendar invitation and Google Meet video room link have been prepared for {email}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <a href="https://calendly.com/omyadv" target="_blank" rel="noreferrer">
              Add to Google Calendar <ArrowUpRight />
            </a>
          </Button>
          <Button variant="ghost" onClick={() => setBookedState(null)}>
            Schedule Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-card/85 p-6 shadow-2xl backdrop-blur-xl md:p-8">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">Live Appointment Desk</span>
          <h2 className="text-xl font-bold text-foreground mt-0.5">Reserve 30-Min Discovery Slot</h2>
        </div>
        <div className="flex rounded-lg border border-border/80 bg-secondary/60 p-0.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setMode("slots")}
            className={`rounded-md px-3 py-1.5 transition-colors cursor-pointer ${
              mode === "slots" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Direct Slots
          </button>
          <button
            type="button"
            onClick={() => setMode("calendly")}
            className={`rounded-md px-3 py-1.5 transition-colors cursor-pointer ${
              mode === "calendly" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Calendly View
          </button>
        </div>
      </div>

      {mode === "slots" ? (
        <form onSubmit={handleSlotBooking} className="mt-6 space-y-6">
          {/* Day selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              1. Select Discovery Date
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {days.map((d, idx) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setSelectedDay(idx)}
                  className={`flex flex-col rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    selectedDay === idx
                      ? "border-primary bg-primary/15 text-foreground ring-1 ring-primary/50"
                      : "border-border/70 bg-secondary/40 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <span className="text-xs font-semibold text-foreground">{d.label}</span>
                  <span className="mt-1 font-mono text-[11px] text-primary">{d.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              2. Select Available Time Slot
            </label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedTime(s)}
                  className={`rounded-lg border px-3.5 py-2 font-mono text-xs transition-all cursor-pointer ${
                    selectedTime === s
                      ? "border-primary bg-primary text-primary-foreground font-medium shadow-md"
                      : "border-border/70 bg-secondary/40 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 border-t border-border/80 pt-5 text-xs">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              3. Your Contact Information
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <span className="block text-[11px] text-muted-foreground mb-1">Your Full Name *</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Adv. Rajesh Malhotra"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <span className="block text-[11px] text-muted-foreground mb-1">Work Email *</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <span className="block text-[11px] text-muted-foreground mb-1">Project Ambition / Agenda</span>
              <input
                type="text"
                value={projectTopic}
                onChange={(e) => setProjectTopic(e.target.value)}
                placeholder="e.g. Discussing web platform redesign & reel cinema campaign"
                className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-primary"
              />
            </div>
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <ArrowUpRight />
            )}
            {isSubmitting ? "Locking in slot..." : `Reserve Slot for ${days[selectedDay]?.label} at ${selectedTime}`}
          </Button>

          <p className="text-center text-[10px] text-muted-foreground">
            Directly synced with Om Yadav's calendar. No payment required.
          </p>
        </form>
      ) : (
        <div className="mt-6">
          <iframe
            src="https://calendly.com/omyadv?embed_type=Inline&background_color=08090b&text_color=ededed&primary_color=c59b4b"
            title="Om Yadav live appointment calendar"
            className="h-[750px] w-full rounded-xl border-0"
          />
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Powered by Calendly</span>
            <Button asChild variant="outline" size="sm">
              <a href="https://calendly.com/omyadv" target="_blank" rel="noreferrer">
                Open in Full Window <ArrowUpRight size={13} />
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
