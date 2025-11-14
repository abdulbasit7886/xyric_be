"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const http_status_codes_1 = require("http-status-codes");
const env_1 = __importDefault(require("./config/env"));
const db_1 = __importDefault(require("./config/db"));
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, logger_1.httpLogger)());
app.get("/", (_req, res) => res
    .status(http_status_codes_1.StatusCodes.OK)
    .json({ status: "ok", timestamp: new Date().toISOString() }));
app.use("/api/items", item_routes_1.default);
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    await (0, db_1.default)();
    app.listen(env_1.default.port, () => {
        console.log(`🚀 Server running on http://localhost:${env_1.default.port}`);
    });
};
void startServer();
exports.default = app;
//# sourceMappingURL=server.js.map