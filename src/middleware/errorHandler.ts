import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { logger } from "../utils/logger";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  const statusCode =
    err instanceof ApiError
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

  if (statusCode >= 500) {
    logger.error(err);
  } else {
    logger.info(err.message);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    details: err instanceof ApiError ? err.details : undefined,
  });
};

export const notFoundHandler = (_req: Request, res: Response): Response =>
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, message: "Route not found" });
