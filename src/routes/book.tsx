import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/Forms";
import { seo } from "@/components/site/Shell";

export const Route = createFileRoute("/book")({
  head: () => seo("Book a One-on-One Call — OMCRE8 Studio", "Schedule a direct 30-minute call with Om Yadav to discuss your project."),
  component: Book,
});

function Book() {
  return (
    <section className="container-x grid gap-12 pt-20 md:grid-cols-[1fr_2fr] md:pt-28">
      <div>
        <p className="eyebrow">Book a call</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Talk to the founder.</h1>
        <p className="mt-4 text-muted-foreground">A 30-minute call with Om Yadav to discuss your idea, scope, and next steps.</p>
      </div>
      <div className="glass-card rounded-lg p-2 md:p-4"><BookingForm /></div>
    </section>
  );
}
