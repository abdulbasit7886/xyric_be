import morgan from "morgan";
import { RequestHandler } from "express";

export const logger = {
  info: (...args: unknown[]): void => {
    console.log("[INFO]", ...args);
  },
  error: (...args: unknown[]): void => {
    console.error("[ERROR]", ...args);
  },
};

export const httpLogger = (): RequestHandler =>
  morgan(":method :url :status :response-time ms");
