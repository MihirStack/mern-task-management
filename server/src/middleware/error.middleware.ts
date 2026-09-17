import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import env from "../config/env.js";
import logger from "../config/logger.js";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
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
      error: error.message,
    }),
  });
};