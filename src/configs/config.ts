import { config } from "dotenv";

config();

export const configs = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
};
