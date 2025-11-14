"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const validate = (schema) => (req, _res, next) => {
    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
    });
    if (!result.success) {
        const details = result.error.flatten();
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Validation failed", details);
    }
    const segments = result.data;
    if (segments.body && typeof segments.body === "object") {
        Object.assign(req.body, segments.body);
    }
    if (segments.query && typeof segments.query === "object") {
        Object.assign(req.query, segments.query);
    }
    if (segments.params && typeof segments.params === "object") {
        Object.assign(req.params, segments.params);
    }
    next();
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map