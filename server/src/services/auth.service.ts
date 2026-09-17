import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";

import type { RegisterInput } from "../validators/auth.validator.js";

import { AppError } from "../utils/appError.js";

const SALT_ROUNDS = 12;

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export const registerUser = async (
  input: RegisterInput,
): Promise<RegisteredUser> => {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new AppError(
      409,
      "An account with this email already exists",
    );
  }

  const hashedPassword = await bcrypt.hash(
    input.password,
    SALT_ROUNDS,
  );

  const user = await createUser({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
};