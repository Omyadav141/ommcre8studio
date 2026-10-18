import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { InquiryForm } from "@/components/site/Forms";
import { seo } from "@/components/site/Shell";
import { studio } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => seo("Start a Project — OMCRE8 Studio", "Tell us about your website, software, or digital project and get a clear, honest quote."),
  component: Contact,
});

function Contact() {
  const { service } = Route.useSearch();
  return (
    <section className="container-x grid gap-12 pt-20 md:grid-cols-[1fr_2fr] md:pt-28">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Start a project.</h1>
        <p className="mt-4 text-muted-foreground">Share your goals and project details. Your enquiry is saved securely; email notifications are not yet active.</p>
        <div className="mt-8 space-y-3 text-sm">
          <a href={`mailto:${studio.email}`} className="block underline-offset-4 hover:underline">{studio.email}</a>
          {studio.whatsapp && <a href={`https://wa.me/${studio.whatsapp}`} className="block hover:underline">WhatsApp</a>}
          <Link to="/book" className="block underline-offset-4 hover:underline">Prefer to talk? Book a call →</Link>
        </div>
      </div>
      <div className="glass rounded-2xl border p-6 shadow-soft md:p-8">
        <InquiryForm key={service} defaultService={service ?? ""} />
      </div>
    </section>
  );
}
