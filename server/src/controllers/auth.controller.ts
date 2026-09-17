import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { registerUser } from "../services/auth.service.js";

import type { RegisterInput } from "../validators/auth.validator.js";

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};