import { config } from "dotenv";
config();

export const { PORT, CORS_ORIGIN } = process.env;
