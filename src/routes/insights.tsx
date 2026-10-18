import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route=createFileRoute("/insights")({component:Layout});
function Layout(){return <Outlet/>;}
