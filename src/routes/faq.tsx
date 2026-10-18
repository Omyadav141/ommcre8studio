import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CTA, SectionHead, seo } from "@/components/site/Shell";

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQ — OMCRE8 Studio", "Answers about services, pricing, process, meetings, and support at OMCRE8 Studio."),
  component: Faq,
});

const faqs = [
  ["What services does OMCRE8 Studio provide?", "Websites, custom software, e-commerce, backend & APIs, mobile apps, UI/UX, AI & automation, branding, social media, digital marketing, film production, cinematography, editing, and maintenance."],
  ["How do I start a project?", "Submit a project enquiry or use the live booking calendar. Enquiries are saved, but email notifications are not active yet; contact the studio directly for a follow-up."],
  ["How much does a website or software project cost?", "It depends on scope. After understanding your requirements we share a clear, affordable quote."],
  ["Can I book a direct meeting with Om Yadav?", "Yes — the Book a Call page uses Om’s live Calendly calendar, with time-zone selection and provider-managed confirmation."],
  ["What information should I provide before getting a quote?", "Your goals, required features, any references, budget range, and timeline."],
  ["Do you work with existing websites?", "Yes. We redesign, improve, fix, and extend existing sites and apps."],
  ["Do you offer maintenance and ongoing support?", "Yes, maintenance and support plans are available after launch."],
  ["How does the development process work?", "Discover, Plan, Design, Build, then Launch & Support — with reviews at each step."],
  ["Can I request both development and digital marketing?", "Absolutely. One team can handle building and growing your business online."],
];

function Faq() {
  return (
    <>
      <section className="container-x max-w-3xl pt-20 md:pt-28">
        <p className="eyebrow">FAQ</p><h1 className="mt-4 text-4xl font-medium md:text-5xl">Common questions.</h1>
        <Accordion type="single" collapsible className="mt-10 border-t">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <CTA />
    </>
  );
}
