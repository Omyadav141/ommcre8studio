import { createFileRoute } from "@tanstack/react-router";
import { InquiryForm } from "@/components/site/Forms";
import { seo } from "@/components/site/Shell";
export const Route = createFileRoute("/inquiry")({ head:()=>seo("Project Inquiry — OMCRE8 Studio","Share your brief for digital engineering, branding, film production or marketing."),component:Inquiry });
function Inquiry(){return <section className="container-x grid gap-12 pt-20 md:grid-cols-[1fr_2fr] md:pt-28"><div><p className="eyebrow">Let's begin</p><h1 className="mt-5 text-4xl font-medium">Your next project.</h1><p className="mt-5 text-muted-foreground">Tell us the goal, what you have already and what a good outcome would look like.</p></div><div className="glass-card rounded-lg p-6 md:p-8"><InquiryForm/></div></section>;}
