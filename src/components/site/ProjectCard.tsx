import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Image } from "lucide-react";
import type { Project } from "@/lib/site";
export function ProjectCard({ p }: { p: Project }) {
  return <Link to="/work/$slug" params={{ slug: p.slug }} className="glass-card group block h-full overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-1">
    <div className="aspect-[16/10] max-h-56 overflow-hidden border-b bg-secondary">{p.image ? <img src={p.image} alt={p.imageAlt ?? `${p.name} preview`} loading="lazy" width={640} height={400} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" /> : <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground"><Image size={28} strokeWidth={1} aria-hidden="true" /><p className="text-xs">Project preview pending</p></div>}</div>
    <div className="p-5"><p className="eyebrow">{p.category}</p><h3 className="mt-3 flex items-center justify-between gap-3 text-xl font-medium">{p.name}<ArrowUpRight size={18} className="shrink-0" /></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p><p className="mt-6 border-t pt-4 text-xs font-medium">{p.draft ? "Explore concept" : "Explore reference"} ↗</p></div>
  </Link>;
}
