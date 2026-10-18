import { Router, Request, Response } from "express";
import { db } from "../db";

export const bookingsRouter = Router();

// GET /api/bookings
bookingsRouter.get("/", (req: Request, res: Response) => {
  const bookings = db.getBookings();
  res.json({ success: true, count: bookings.length, bookings });
});

// POST /api/bookings
bookingsRouter.post("/", (req: Request, res: Response): void => {
  const { name, email, scheduledAt, serviceInterest, notes } = req.body;

  if (!name || !email || !scheduledAt) {
    res.status(400).json({ success: false, error: "Name, email, and scheduledAt are required." });
    return;
  }

  const booking = db.createBooking({
    name,
    email,
    scheduledAt,
    serviceInterest,
    notes,
    status: "confirmed",
  });

  res.status(201).json({ success: true, booking });
});

// PATCH /api/bookings/:id
bookingsRouter.patch("/:id", (req: Request, res: Response): void => {
  const { status, notes, scheduledAt } = req.body;
  const updated = db.updateBooking(req.params.id, {
    ...(status ? { status } : {}),
    ...(notes !== undefined ? { notes } : {}),
    ...(scheduledAt ? { scheduledAt } : {}),
  });

  if (!updated) {
    res.status(404).json({ success: false, error: "Booking not found" });
    return;
  }

  res.json({ success: true, booking: updated });
});

// POST /api/bookings/calendly-webhook
bookingsRouter.post("/calendly-webhook", (req: Request, res: Response) => {
  const event = req.body?.event;
  const payload = req.body?.payload;

  console.log(`[Calendly Webhook] Received event: ${event}`);

  if (event === "invitee.created" && payload) {
    db.createBooking({
      name: payload.name || "Calendly Client",
      email: payload.email || "unknown@calendly.com",
      scheduledAt: payload.scheduled_event?.start_time || new Date().toISOString(),
      serviceInterest: payload.tracking?.utm_campaign || "Studio Discovery Call",
      status: "confirmed",
      meetingUrl: payload.scheduled_event?.location?.join_url,
      notes: `Booked via Calendly: ${payload.event_type?.name || "Discovery Call"}`,
    });
  }

  res.json({ received: true });
});
