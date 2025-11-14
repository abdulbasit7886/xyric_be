import mongoose from "mongoose";
import env from "./env";

//@ts-ignore
import { logger } from "../utils/logger";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info(`🗄️  MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    logger.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
