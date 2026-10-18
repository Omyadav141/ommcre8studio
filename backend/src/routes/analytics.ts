import { Router, Request, Response } from "express";
import { db } from "../db";

export const analyticsRouter = Router();

// GET /api/analytics
analyticsRouter.get("/", (req: Request, res: Response) => {
  const analytics = db.getAnalytics();
  res.json({
    success: true,
    analytics,
  });
});
