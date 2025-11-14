"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItem = exports.listItems = exports.createItem = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const item_model_1 = require("../models/item.model");
const buildFilter = (query) => {
    const filter = {};
    if (query.search) {
        filter.$text = { $search: query.search };
    }
    if (query.status) {
        filter.status = query.status;
    }
    return filter;
};
exports.createItem = (0, catchAsync_1.default)(async (req, res) => {
    const item = await item_model_1.Item.create(req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, data: item });
});
exports.listItems = (0, catchAsync_1.default)(async (req, res) => {
    const { search, status, page = 1, limit = 10, } = req.query;
    const filter = buildFilter({ search, status });
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        item_model_1.Item.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        item_model_1.Item.countDocuments(filter),
    ]);
    return res.json({
        success: true,
        data: items,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 1,
        },
    });
});
exports.getItem = (0, catchAsync_1.default)(async (req, res) => {
    const item = await item_model_1.Item.findById(req.params.id);
    if (!item) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Item not found");
    }
    return res.json({ success: true, data: item });
});
exports.updateItem = (0, catchAsync_1.default)(async (req, res) => {
    const item = await item_model_1.Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!item) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Item not found");
    }
    return res.json({ success: true, data: item });
});
exports.deleteItem = (0, catchAsync_1.default)(async (req, res) => {
    const item = await item_model_1.Item.findByIdAndDelete(req.params.id);
    if (!item) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Item not found");
    }
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true });
});
//# sourceMappingURL=item.controller.js.map