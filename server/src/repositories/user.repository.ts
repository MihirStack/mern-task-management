import User, {
  type IUser,
  type UserDocument,
} from "../models/user.model.js";

export const findUserByEmail = async (
  email: string,
): Promise<UserDocument | null> => {
  return User.findOne({
    email: email.toLowerCase(),
  });
};

export const createUser = async (
  data: Pick<IUser, "name" | "email" | "password">,
): Promise<UserDocument> => {
  return User.create(data);
};