import { Router, Request, Response } from "express";
import { db } from "../db";

export const projectsRouter = Router();

// GET /api/projects
projectsRouter.get("/", (req: Request, res: Response) => {
  const projects = db.getProjects();
  res.json({ success: true, count: projects.length, projects });
});

// PATCH /api/projects/:id
projectsRouter.patch("/:id", (req: Request, res: Response): void => {
  const { status, featured, name, category, description } = req.body;
  const updated = db.updateProject(req.params.id, {
    ...(status ? { status } : {}),
    ...(featured !== undefined ? { featured } : {}),
    ...(name ? { name } : {}),
    ...(category ? { category } : {}),
    ...(description ? { description } : {}),
  });

  if (!updated) {
    res.status(404).json({ success: false, error: "Project not found" });
    return;
  }

  res.json({ success: true, project: updated });
});
