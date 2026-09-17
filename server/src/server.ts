import app from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";

const startServer = (): void => {
  app.listen(env.PORT, () => {
    logger.info(
      `🚀 TaskFlow API running at http://localhost:${env.PORT}`,
    );
  });
};

startServer();