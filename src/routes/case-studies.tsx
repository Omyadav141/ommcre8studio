import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { seo } from "@/components/site/Shell";
export const Route=createFileRoute("/case-studies")({head:()=>seo("Case Studies — OMCRE8 Studio","Verified project stories and approved studio deliverables. Explore the supplied website reference while detailed contributions are confirmed."),component:CaseStudies});
function CaseStudies(){return <section className="container-x pt-20 md:pt-28"><p className="eyebrow">Case studies</p><h1 className="mt-5 text-5xl font-medium">The detail behind the work.</h1><p className="mt-7 max-w-xl text-lg text-muted-foreground">Detailed studio case studies will be published with confirmed project roles, approved assets and real outcomes. No speculative contributions or performance figures are presented as fact.</p><Button asChild variant="outline" className="mt-8"><Link to="/work">View project references</Link></Button></section>;}
