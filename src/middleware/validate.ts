import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

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

    Object.assign(req, result.data);
    next();
  };
