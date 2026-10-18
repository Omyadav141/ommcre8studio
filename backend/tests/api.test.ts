import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app } from "../src/app";

test("API Test Suite — OMCRE8 Studio Backend", async (t) => {
  await t.test("GET /api/health should return ok", async () => {
    const res = await request(app).get("/api/health");
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "ok");
    assert.equal(res.body.founder, "Om Yadav");
  });

  await t.test("POST /api/inquiries should reject invalid payload", async () => {
    const res = await request(app).post("/api/inquiries").send({
      name: "A", // too short
      email: "invalid-email",
    });
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.ok(res.body.errors);
  });

  let createdInquiryRef = "";
  let createdInquiryId = "";

  await t.test("POST /api/inquiries should create inquiry with valid payload", async () => {
    const res = await request(app)
      .post("/api/inquiries")
      .send({
        name: "Test Client",
        email: "testclient@example.com",
        phone: "+91 99999 88888",
        company: "Venture Corp",
        website: "https://venture.example.com",
        service: "web-development",
        title: "New Flagship Web Portal",
        description: "We require a high performance web application with booking funnel and dark cinematic aesthetic.",
        budget: "₹75,000 – ₹2,00,000",
        timeline: "Within 1 month",
        contactPref: "Email",
        consent: true,
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.reference.startsWith("OCS-2026-"));
    assert.equal(res.body.inquiry.name, "Test Client");
    createdInquiryRef = res.body.reference;
    createdInquiryId = res.body.inquiry.id;
  });

  await t.test("GET /api/inquiries should return inquiries list", async () => {
    const res = await request(app).get("/api/inquiries");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.inquiries));
    assert.ok(res.body.inquiries.length > 0);
  });

  await t.test("PATCH /api/inquiries/:id should update lead status", async () => {
    const res = await request(app)
      .patch(`/api/inquiries/${createdInquiryId}`)
      .send({
        status: "reviewing",
        notes: "Reviewed by Om Yadav. Follow up scheduled.",
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.inquiry.status, "reviewing");
    assert.equal(res.body.inquiry.notes, "Reviewed by Om Yadav. Follow up scheduled.");
  });

  await t.test("POST /api/ai/chat should answer about True Legal Advice", async () => {
    const res = await request(app)
      .post("/api/ai/chat")
      .send({
        message: "Tell me about the True Legal Advice project",
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.reply.includes("True Legal Advice"));
    assert.ok(res.body.reply.includes("trulegaladvice.com"));
  });

  await t.test("POST /api/ai/chat should answer about founder Om Yadav", async () => {
    const res = await request(app)
      .post("/api/ai/chat")
      .send({
        message: "Who is Om Yadav?",
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.reply.includes("Om Yadav"));
    assert.ok(res.body.reply.includes("OMCRE8"));
  });

  await t.test("POST /api/auth/login should authenticate admin with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@omcreate.studio",
        password: "admin123",
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.token);
    assert.equal(res.body.admin.role, "admin");
  });

  await t.test("POST /api/auth/login should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@omcreate.studio",
        password: "wrongpassword",
      });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  await t.test("GET /api/analytics should return dashboard metrics", async () => {
    const res = await request(app).get("/api/analytics");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.analytics.totalInquiries > 0);
    assert.ok(res.body.analytics.serviceBreakdown);
  });
});
