import { createFileRoute,Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { seo } from "@/components/site/Shell";
import { insights } from "@/lib/insights";
export const Route=createFileRoute("/insights/")({head:()=>seo("Insights — OMCRE8 Studio","Practical notes on product strategy, brand film production and e-commerce delivery from OMCRE8 Studio."),component:Insights});
function Insights(){return <section className="container-x pt-20 md:pt-28"><p className="eyebrow">Studio notes</p><h1 className="mt-5 text-5xl font-medium md:text-7xl">Ideas worth thinking through.</h1><div className="mt-16">{insights.map(a=><Link key={a.slug} to="/insights/$slug" params={{slug:a.slug}} className="grid gap-5 border-t py-9 md:grid-cols-[1fr_2fr_auto]"><p className="eyebrow">{a.category}</p><div><h2 className="text-2xl">{a.title}</h2><p className="mt-4 text-muted-foreground">{a.intro}</p></div><ArrowUpRight/></Link>)}</div></section>;}
