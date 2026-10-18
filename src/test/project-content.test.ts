import { describe, expect, it } from "vitest";
import { projects } from "@/lib/site";

describe("project requirements", () => {
  it("provides at least three projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });
  it("uses the confirmed legal website address without the E", () => {
    expect(projects.find(p => p.slug === "true-legal-advice")?.url).toBe("https://trulegaladvice.com/");
  });
  it("keeps illustrative concepts separate from verified client work", () => {
    expect(projects.find(p => p.slug === "fashion-commerce")?.draft).toBe(true);
    expect(projects.find(p => p.slug === "trademark-platform")?.draft).toBe(true);
  });
  it("does not substitute AI pictures for missing authentic project media", () => {
    expect(projects.find(p => p.slug === "fashion-commerce")?.image).toBeUndefined();
    expect(projects.find(p => p.slug === "trademark-platform")?.image).toBeUndefined();
  });
});