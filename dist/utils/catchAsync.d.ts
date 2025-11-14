import { NextFunction, Request, Response } from "express";
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
export declare const catchAsync: (handler: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map