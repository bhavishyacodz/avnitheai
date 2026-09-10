import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { routeCommand } from "./toolRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// ==========================================
// FRONTEND
// ==========================================

app.use(
  express.static(
    path.join(__dirname, "..", "frontend")
  )
);


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "AI Command Center",
    phase: "0.1"
  });
});


// ==========================================
// COMMAND API
// ==========================================

app.post("/api/command", async (req, res) => {
  try {
    const { command } = req.body;

    const result = await routeCommand(
      command || ""
    );

    res.json(result);

  } catch (error) {

    console.error("Command error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
});


// ==========================================
// WHATSAPP WEBHOOK VERIFICATION
// ==========================================

app.get("/webhook", (req, res) => {

  const mode =
    req.query["hub.mode"];

  const token =
    req.query["hub.verify_token"];

  const challenge =
    req.query["hub.challenge"];

  const VERIFY_TOKEN =
    process.env.WHATSAPP_VERIFY_TOKEN;

  console.log(
    "Webhook verification request received."
  );

  console.log({
    mode,
    tokenReceived: Boolean(token),
    challengeReceived: Boolean(challenge)
  });


  if (
    mode === "subscribe" &&
    token === VERIFY_TOKEN
  ) {

    console.log(
      "WhatsApp webhook verified successfully."
    );

    return res
      .status(200)
      .send(challenge);
  }


  console.log(
    "WhatsApp webhook verification failed."
  );

  return res.sendStatus(403);
});


// ==========================================
// WHATSAPP INCOMING MESSAGES
// ==========================================

app.post("/webhook", (req, res) => {

  console.log(
    "WhatsApp webhook received:"
  );

  console.log(
    JSON.stringify(
      req.body,
      null,
      2
    )
  );

  res.sendStatus(200);
});


// ==========================================
// FRONTEND FALLBACK
// ==========================================

app.get("/{*splat}", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "..",
      "frontend",
      "index.html"
    )
  );

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

  console.log(
    `AI Command Center running on port ${PORT}`
  );

});
