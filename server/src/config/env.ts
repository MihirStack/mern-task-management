import "dotenv/config";

const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    MONGODB_URI: process.env.MONGODB_URI ?? "mongodb://localhost:27017/taskflow",
    PORT: process.env.PORT ?? 5000,
    JWT_SECRET: process.env.JWT_SECRET ?? "taskflow_local_development_secret_9999999999999999999",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
    CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173"
};

export default env;
