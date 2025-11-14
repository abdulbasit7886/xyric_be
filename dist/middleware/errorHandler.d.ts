import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
export declare const errorHandler: (err: Error | ApiError, _req: Request, res: Response, _next: NextFunction) => Response;
export declare const notFoundHandler: (_req: Request, res: Response) => Response;
//# sourceMappingURL=errorHandler.d.ts.map