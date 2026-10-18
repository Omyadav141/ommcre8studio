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
  const [result, setResult] = useState<{ url: string | null; error: string | null } | null>(null);
  const load = useServerFn(getBookingLink);
  useEffect(() => { let active = true; load().then(r => { if (active) setResult(r); }).catch(() => { if (active) setResult({ url: null, error: "Live scheduling is temporarily unavailable." }); }); return () => { active = false; }; }, [load]);
  if (!result) return <div className="flex items-center gap-3 py-16" role="status"><LoaderCircle className="animate-spin" />Loading live appointments…</div>;
  if (!result.url) return <div className="py-12"><h2 className="text-2xl">Appointments unavailable</h2><p className="mt-4 text-muted-foreground">{result.error}</p><Button asChild variant="outline" className="mt-6"><a href={`mailto:${studio.email}`}>Contact Om <ArrowUpRight /></a></Button></div>;
  const url = new URL(result.url);
  url.searchParams.set("embed_domain", typeof window === "undefined" ? "localhost" : window.location.hostname);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("hide_gdpr_banner", "0");
  url.searchParams.set("background_color", "fafcfb");
  url.searchParams.set("text_color", "23313d");
  url.searchParams.set("primary_color", "28635e");
  return <div><iframe src={url.toString()} title="Om Yadav live appointment calendar" className="h-[850px] w-full rounded-md border-0" /><div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm"><span className="text-muted-foreground">Availability, time zones and confirmations by Calendly.</span><Button asChild variant="outline"><a href={result.url} target="_blank" rel="noreferrer">Open calendar <ArrowUpRight /></a></Button></div></div>;
}
