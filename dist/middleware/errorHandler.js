"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const logger_1 = require("../utils/logger");
/* eslint-disable @typescript-eslint/no-unused-vars */
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err instanceof ApiError_1.default
        ? err.statusCode
        : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR;
    if (statusCode >= 500) {
        logger_1.logger.error(err);
    }
    else {
        logger_1.logger.info(err.message);
    }
    return res.status(statusCode).json({
        success: false,
        message,
        details: err instanceof ApiError_1.default ? err.details : undefined,
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (_req, res) => res
    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
    .json({ success: false, message: "Route not found" });
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorHandler.js.map