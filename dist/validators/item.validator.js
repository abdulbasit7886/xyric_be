"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listItemSchema = exports.getItemSchema = exports.updateItemSchema = exports.createItemSchema = void 0;
const zod_1 = require("zod");
const tagsSchema = zod_1.z.array(zod_1.z.string().trim()).default([]);
const baseItemSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(3, "Title must be at least 3 characters"),
    description: zod_1.z.string().trim().max(2000).optional(),
    category: zod_1.z.string().trim().max(100).optional(),
    price: zod_1.z.number().nonnegative(),
    quantity: zod_1.z.number().int().nonnegative(),
    tags: tagsSchema,
    status: zod_1.z.enum(["active", "inactive", "archived"]).default("active"),
});
exports.createItemSchema = zod_1.z.object({
    body: baseItemSchema,
});
exports.updateItemSchema = zod_1.z.object({
    body: baseItemSchema.partial(),
    params: zod_1.z.object({ id: zod_1.z.string().min(1) }),
});
exports.getItemSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string().min(1) }),
});
exports.listItemSchema = zod_1.z.object({
    query: zod_1.z.object({
        search: zod_1.z.string().trim().optional(),
        status: zod_1.z.enum(["active", "inactive", "archived"]).optional(),
        page: zod_1.z.coerce.number().int().min(1).default(1),
        limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    }),
});
//# sourceMappingURL=item.validator.js.map