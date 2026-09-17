import type { Server } from "node:http";

import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import env from "./config/env.js";
import logger from "./config/logger.js";

let httpServer: Server | undefined;

const startServer = async (): Promise<void> => {
  try {
    // Database MUST connect first
    await connectDatabase();

    // Only then start Express
    httpServer = app.listen(env.PORT, () => {
      logger.info(
        {
          port: env.PORT,
          environment: env.NODE_ENV,
        },
        `TaskFlow API running at http://localhost:${env.PORT}`,
      );
    });
  } catch (error) {
    logger.fatal(
      { error },
      "Failed to start TaskFlow API",
    );

    process.exit(1);
  }
};

const shutdown = async (signal: string): Promise<void> => {
  logger.info({ signal }, "Shutdown signal received");

  if (httpServer) {
    httpServer.close(async () => {
      try {
        await disconnectDatabase();

        logger.info("TaskFlow API shutdown completed");

        process.exit(0);
      } catch (error) {
        logger.error({ error }, "Shutdown failed");
        process.exit(1);
      }
    });

    return;
  }

  await disconnectDatabase();
  process.exit(0);
};

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

void startServer();