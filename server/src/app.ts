import express from "express";

import { errorHandler } from "./middlewares/error.middleware.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import { apiRateLimiter } from "./middlewares/rateLimit.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use("/api", apiRateLimiter);

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is healthy",
  });
});

app.use("/api/v1/auth", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;