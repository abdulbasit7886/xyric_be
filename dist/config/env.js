"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.resolve(process.cwd(), ".env") });
const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number(process.env.PORT ?? 4000),
    mongoUri: process.env.MONGO_URI ??
        "mongodb+srv://abdulbasit:Ye305uAnX00xXpxT@cluster0.mgw5ewr.mongodb.net/xyric",
};
exports.default = env;
//# sourceMappingURL=env.js.map