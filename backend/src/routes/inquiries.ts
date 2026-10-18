import { Router, Request, Response } from "express";
import { z } from "zod";
import { db } from "../db";
import { emailService } from "../services/email";

export const inquiriesRouter = Router();

const createInquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address").max(255),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(120).optional(),
  website: z.string().trim().max(255).optional(),
  service: z.string().trim().min(1, "Please select a service"),
  title: z.string().trim().min(2, "Project title is required").max(150),
  description: z.string().trim().min(10, "Please provide more details on your project").max(3000),
  budget: z.string().trim().optional(),
  timeline: z.string().trim().optional(),
  contactPref: z.string().trim().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy notice" }),
  }),
});

// POST /api/inquiries
inquiriesRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = createInquirySchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        errors: parseResult.error.format(),
      });
      return;
    }

    const newInquiry = db.createInquiry(parseResult.data);

    // Trigger automated emails asynchronously
    emailService.sendClientInquiryConfirmation(newInquiry).catch((e) =>
      console.error("[Email] Confirmation failed:", e)
    );
    emailService.sendFounderLeadAlert(newInquiry).catch((e) =>
      console.error("[Email] Founder alert failed:", e)
    );

    res.status(201).json({
      success: true,
      message: "Enquiry successfully received and saved.",
      reference: newInquiry.reference,
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error("[Inquiries] Error creating inquiry:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/inquiries
inquiriesRouter.get("/", (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;

  const inquiries = db.getInquiries({ status, search });
  res.json({
    success: true,
    count: inquiries.length,
    inquiries,
  });
});

// GET /api/inquiries/:id
inquiriesRouter.get("/:id", (req: Request, res: Response): void => {
  const inquiry = db.getInquiryById(req.params.id);
  if (!inquiry) {
    res.status(404).json({ success: false, error: "Enquiry not found" });
    return;
  }
  res.json({ success: true, inquiry });
});

// PATCH /api/inquiries/:id
inquiriesRouter.patch("/:id", (req: Request, res: Response): void => {
  const { status, notes } = req.body;
  const updated = db.updateInquiry(req.params.id, {
    ...(status ? { status } : {}),
    ...(notes !== undefined ? { notes } : {}),
  });

  if (!updated) {
    res.status(404).json({ success: false, error: "Enquiry not found" });
    return;
  }

  res.json({ success: true, inquiry: updated });
});

// DELETE /api/inquiries/:id
inquiriesRouter.delete("/:id", (req: Request, res: Response): void => {
  const deleted = db.deleteInquiry(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, error: "Enquiry not found" });
    return;
  }
  res.json({ success: true, message: "Enquiry deleted" });
});
