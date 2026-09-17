import type { ErrorRequestHandler } from "express";

import env from "../config/env.js";
import logger from "../config/logger.js";
import { AppError } from "../utils/appError.js";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next,
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  logger.error(
    {
      error,
      method: req.method,
      url: req.originalUrl,
    },
    "Unhandled application error",
  );

  res.status(500).json({
    success: false,
    message: "Internal server error",

    ...(env.NODE_ENV === "development" && {
      error: error instanceof Error
        ? error.message
        : "Unknown error",
    }),
  });
};