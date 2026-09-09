import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { routeCommand } from "./toolRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  express.static(path.join(__dirname, "..", "frontend"))
);

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "AI Command Center",
    phase: "0.1"
  });
});

app.post("/api/command", (req, res) => {
  const { command } = req.body;

  const result = routeCommand(command || "");

  res.json(result);
});

app.get("*splat", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "frontend", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`AI Command Center running on port ${PORT}`);
});