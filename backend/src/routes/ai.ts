import { Router, Request, Response } from "express";
import { aiService } from "../services/ai";
import { db } from "../db";

export const aiRouter = Router();

// POST /api/ai/chat
aiRouter.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, sessionId = "default", history = [] } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ success: false, error: "Message string is required" });
      return;
    }

    const result = await aiService.processChat(message, sessionId, history);
    res.json({
      success: true,
      reply: result.reply,
      text: result.reply,
      intent: result.intent,
      actions: result.actions,
    });
  } catch (error) {
    console.error("[AI Chat] Error processing message:", error);
    res.status(500).json({ success: false, error: "AI assistant error" });
  }
});

// GET /api/ai/logs
aiRouter.get("/logs", (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 50;
  const logs = db.getAiLogs(limit);
  res.json({ success: true, count: logs.length, logs });
});
