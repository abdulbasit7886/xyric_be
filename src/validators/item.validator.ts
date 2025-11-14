import { z } from "zod";

const tagsSchema = z.array(z.string().trim()).default([]);

const baseItemSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string().trim().max(2000).optional(),
  category: z.string().trim().max(100).optional(),
  price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative(),
  tags: tagsSchema,
  status: z.enum(["active", "inactive", "archived"]).default("active"),
});

export const createItemSchema = z.object({
  body: baseItemSchema,
});

export const updateItemSchema = z.object({
  body: baseItemSchema.partial(),
  params: z.object({ id: z.string().min(1) }),
});

export const getItemSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const listItemSchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
    status: z.enum(["active", "inactive", "archived"]).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  }),
});
