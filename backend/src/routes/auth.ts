import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "omcre8_super_secure_jwt_secret_change_in_production_2026";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@omcreate.studio").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// POST /api/auth/login
authRouter.post("/login", (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, error: "Email and password are required" });
    return;
  }

  const cleanEmail = email.trim().toLowerCase();

  // Validate admin credentials
  if (cleanEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      {
        email: cleanEmail,
        role: "admin",
        name: "Om Yadav (Studio Admin)",
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      admin: {
        email: cleanEmail,
        name: "Om Yadav (Studio Admin)",
        role: "admin",
      },
    });
    return;
  }

  res.status(401).json({ success: false, error: "Invalid email or password." });
});

// GET /api/auth/me
authRouter.get("/me", (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, error: "Missing or invalid authorization token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ success: false, error: "Token not found" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    res.json({
      success: true,
      admin: {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      },
    });
  } catch {
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
});
