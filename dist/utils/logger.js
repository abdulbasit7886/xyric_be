"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.logger = void 0;
const morgan_1 = __importDefault(require("morgan"));
exports.logger = {
    info: (...args) => {
        console.log("[INFO]", ...args);
    },
    error: (...args) => {
        console.error("[ERROR]", ...args);
    },
};
const httpLogger = () => (0, morgan_1.default)(":method :url :status :response-time ms");
exports.httpLogger = httpLogger;
//# sourceMappingURL=logger.js.map