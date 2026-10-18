import { app } from "./app";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`
=============================================================
   ✦ OMCRE8 STUDIO BACKEND API SERVER RUNNING ✦
   Port: http://localhost:${PORT}
   Health: http://localhost:${PORT}/api/health
   Admin Auth: POST http://localhost:${PORT}/api/auth/login
   Founder: Om Yadav · omyadav.online
=============================================================
  `);
});
