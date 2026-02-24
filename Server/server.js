import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

import fs from "fs";
import path from "path";

const app = express();
await connectDb();
app.use(express.json());
app.use(cors())

const logFile = "server_logs.txt";

app.use((req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync(logFile, logMessage);
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is live...");
});

app.get("/api/test-connection", (req, res) => {
  res.json({ message: "Connection successful", timestamp: new Date() });
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter)

// Catch-all route for unmatched API requests
app.use((req, res) => {
  const logMessage = `${new Date().toISOString()} - [404 NOT FOUND] ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync(logFile, logMessage);
  console.log(`[404 NOT FOUND] ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  const logMessage = `${new Date().toISOString()} - [500 ERROR] ${req.method} ${req.originalUrl}\n${err.stack}\n`;
  fs.appendFileSync(logFile, logMessage);
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
