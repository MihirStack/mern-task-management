import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import env from "./config/env.js";
import logger from "./config/logger.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import { apiRateLimiter } from "./middleware/rateLimit.middleware.js";

const app = express();

// Security
app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

// Request parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(
  pinoHttp({
    logger,
  }),
);

// Rate limiting
app.use("/api", apiRateLimiter);

// Health check
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is healthy",
    environment: env.NODE_ENV,
  });
});

// Must remain after application routes
app.use(notFoundHandler);

// Must remain last
app.use(errorHandler);

export default app;