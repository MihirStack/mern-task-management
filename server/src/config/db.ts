import mongoose from "mongoose";

import env from "./env.js";
import logger from "./logger.js";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    logger.info(
      {
        host: mongoose.connection.host,
        database: mongoose.connection.name,
      },
      "MongoDB connected",
    );
  } catch (error) {
    logger.error(
      { error },
      "MongoDB connection failed",
    );

    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();

  logger.info("MongoDB disconnected");
};