import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";
export declare const validate: (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map