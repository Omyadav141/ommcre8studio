import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { inquiriesRouter } from "./routes/inquiries";
import { aiRouter } from "./routes/ai";
import { bookingsRouter } from "./routes/bookings";
import { authRouter } from "./routes/auth";
import { analyticsRouter } from "./routes/analytics";
import { projectsRouter } from "./routes/projects";

dotenv.config();

export const app: Express = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "OMCRE8 Studio API",
    founder: "Om Yadav",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Route registration
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/ai", aiRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/auth", authRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/projects", projectsRouter);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.url}`,
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("[Server Error]", err);
  res.status(500).json({
    success: false,
    error: "Internal server error occurred",
  });
});
