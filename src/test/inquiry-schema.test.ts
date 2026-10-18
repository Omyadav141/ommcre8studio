import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/inquiry-schema";
const valid = { id:"adf6b76f-8408-4fb8-922e-ac4cb267d239", name:"Test Person", email:"test@example.com", service:"video-production", title:"Brand film", description:"A product launch film for our brand.", contactPref:"Email", consent:"on" };
describe("Inquiry requirements",()=>{
 it("allows optional budget and timeline",()=>{const result=inquirySchema.parse(valid);expect(result.budget).toBe("");expect(result.timeline).toBe("");});
 it("requires contact consent",()=>{expect(inquirySchema.safeParse({...valid,consent:undefined}).success).toBe(false);});
 it("accepts production and editing capabilities",()=>{expect(inquirySchema.safeParse(valid).success).toBe(true);expect(inquirySchema.safeParse({...valid,service:"video-editing"}).success).toBe(true);});
 it("rejects unlisted service",()=>{expect(inquirySchema.safeParse({...valid,service:"fabricated"}).success).toBe(false);});
 it("rejects unsafe website URLs",()=>{expect(inquirySchema.safeParse({...valid,website:"javascript:alert(1)"}).success).toBe(false);});
});
