import "dotenv/config";
import { z } from 'zod';

const envSchema = z.object({    
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().positive().default(5000),
    MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must contain at least 32 characters'),
    JWT_EXPIRES_IN: z.string().default('1d'),
    CLIENT_URL: z.url('CLIENT_URL must be a valid URL').default('http://localhost:5173'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
}

const env = result.data;

export default env;
