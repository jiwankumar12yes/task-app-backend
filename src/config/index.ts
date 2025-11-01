import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("8000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DATABASE_URL: z
    .string({
      message: "DATABASE_URL is required in .env",
    })
    .min(1, { message: "DATABASE_URL must not be empty" }),

  JWT_SECRET: z
    .string({
      message: "JWT_SECRET is required in .env",
    })
    .min(1, { message: "JWT_SECRET must not be empty" }),
  JWT_EXPIRES_IN: z.string().default("1h"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("5d"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log(
    "❌ FATAL: Invalid environment variables found!",
    _env.error.format()
  );
  process.exit(1);
}

export const env = _env.data;
