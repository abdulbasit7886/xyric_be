import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

type ParsedRequestSegments = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

export const validate =
  (schema: ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const details = result.error.flatten();
      throw new ApiError(StatusCodes.BAD_REQUEST, "Validation failed", details);
    }

    const segments = result.data as ParsedRequestSegments;

    if (segments.body && typeof segments.body === "object") {
      Object.assign(req.body, segments.body);
    }
    if (segments.query && typeof segments.query === "object") {
      Object.assign(req.query as object, segments.query as object);
    }
    if (segments.params && typeof segments.params === "object") {
      Object.assign(req.params as object, segments.params as object);
    }

    next();
  };
