import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { inquirySchema } from "./inquiry-schema";
import type { Database } from "@/integrations/supabase/types";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    const url = process.env['SUPABASE_URL'];
    if (!key || !url) return { saved: false, reference: null, error: "Enquiries are temporarily unavailable. Please contact the studio directly." };
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      } },
    });
    const { error } = await client.from("inquiries").insert({
      id: data.id, name: data.name, email: data.email, phone: data.phone,
      company: data.company, website: data.website, service: data.service,
      title: data.title, description: data.description, budget: data.budget,
      timeline: data.timeline, contact_pref: data.contactPref, consent: true,
    });
    if (error) return { saved: false, reference: null, error: "Your enquiry could not be saved. Please retry or contact the studio directly." };
    return { saved: true, reference: `INQ-${data.id}`, error: null };
  });