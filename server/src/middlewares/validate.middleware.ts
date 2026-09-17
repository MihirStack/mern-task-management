import type {
  NextFunction,
  Request,
  Response,
} from "express";
import type { ZodType } from "zod";

export const validate =
  (schema: ZodType) =>
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });

      return;
    }

    next();
  };