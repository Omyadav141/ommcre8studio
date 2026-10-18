import { createFileRoute,notFound } from "@tanstack/react-router";
import { EditorialPage } from "@/components/site/EditorialPage";
import { seo } from "@/components/site/Shell";
import { insights } from "@/lib/insights";
export const Route=createFileRoute("/insights/$slug")({loader:({params})=>{const article=insights.find(a=>a.slug===params.slug);if(!article)throw notFound();return {article};},head:({loaderData})=>seo(loaderData?`${loaderData.article.title} — OMCRE8 Studio`:"Article unavailable — OMCRE8 Studio",loaderData?.article.intro??"Studio insights."),component:Article});
function Article(){const {article:a}=Route.useLoaderData();return <EditorialPage eyebrow={a.category} title={a.title} introduction={a.intro} sections={a.sections}/>;}
