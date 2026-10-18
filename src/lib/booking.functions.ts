import { createServerFn } from "@tanstack/react-start";

export const getBookingLink = createServerFn({ method: "GET" }).handler(async () => {
  const directUrl = process.env["CALENDLY_URL"] || "https://calendly.com/omyadv";
  if (directUrl && directUrl.startsWith("https://calendly.com/")) {
    return { url: directUrl, error: null };
  }

  const key = process.env["CALENDLY_API_KEY"];
  if (!key) {
    return { url: "https://calendly.com/omyadv", error: null };
  }

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  try {
    const me = await fetch("https://api.calendly.com/users/me", { headers });
    if (!me.ok) {
      return { url: "https://calendly.com/omyadv", error: null };
    }
    const user = (await me.json()) as { resource: { uri: string } };
    const endpoint = new URL("https://api.calendly.com/event_types");
    endpoint.searchParams.set("user", user.resource.uri);
    endpoint.searchParams.set("active", "true");
    const res = await fetch(endpoint, { headers });
    if (!res.ok) {
      return { url: "https://calendly.com/omyadv", error: null };
    }
    const result = (await res.json()) as { collection: { scheduling_url: string; secret: boolean }[] };
    const event = result.collection.find((e) => !e.secret && e.scheduling_url.startsWith("https://calendly.com/"));
    return { url: event?.scheduling_url ?? "https://calendly.com/omyadv", error: null };
  } catch {
    return { url: "https://calendly.com/omyadv", error: null };
  }
});