"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (handler) => (req, res, next) => {
    handler(req, res, next).catch(next);
};
exports.catchAsync = catchAsync;
exports.default = exports.catchAsync;
//# sourceMappingURL=catchAsync.js.map