import { config } from 'dotenv';
import {z} from 'zod';

if (process.env.NODE_ENV === 'test') {
    config({ path: '.env.test' });
} else {
    config();
}

const envSchema = z.object({
    NOVE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string().default("./db/app.db"),
    PORT: z.number().default(3000),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    throw new Error('Invalid environment variables');
}

export const env = _env.data;
