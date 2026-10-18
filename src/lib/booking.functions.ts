import { createServerFn } from "@tanstack/react-start";

export const getBookingLink = createServerFn({ method: "GET" }).handler(async () => {
  const directUrl = process.env["CALENDLY_URL"];
  if (directUrl && directUrl.startsWith("https://calendly.com/")) {
    return { url: directUrl, error: null };
  }

  const key = process.env["CALENDLY_API_KEY"];
  if (!key) return { url: null, error: "Live scheduling is not connected." };

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  try {
    const me = await fetch("https://api.calendly.com/users/me", { headers });
    if (!me.ok) {
      console.error("Calendly user read failed", me.status, await me.text());
      return { url: null, error: "Live scheduling is temporarily unavailable." };
    }
    const user = (await me.json()) as { resource: { uri: string } };
    const endpoint = new URL("https://api.calendly.com/event_types");
    endpoint.searchParams.set("user", user.resource.uri);
    endpoint.searchParams.set("active", "true");
    const res = await fetch(endpoint, { headers });
    if (!res.ok) {
      console.error("Calendly event read failed", res.status, await res.text());
      return { url: null, error: "Live scheduling is temporarily unavailable." };
    }
    const result = (await res.json()) as { collection: { scheduling_url: string; secret: boolean }[] };
    const event = result.collection.find((e) => !e.secret && e.scheduling_url.startsWith("https://calendly.com/"));
    return { url: event?.scheduling_url ?? null, error: event ? null : "No public appointments are available yet." };
  } catch {
    return { url: null, error: "Live scheduling is temporarily unavailable." };
  }
});