import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FilterQuery } from "mongoose";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { Item, ItemDocument } from "../models/item.model";

const buildFilter = (query: {
  search?: string | undefined;
  status?: ItemDocument["status"] | undefined;
}): FilterQuery<ItemDocument> => {
  const filter: FilterQuery<ItemDocument> = {};

  if (query.search) {
    filter.$text = { $search: query.search };
  }

  if (query.status) {
    filter.status = query.status;
  }

  return filter;
};

export const createItem = catchAsync(async (req: Request, res: Response) => {
  const item = await Item.create(req.body);

  return res.status(StatusCodes.CREATED).json({ success: true, data: item });
});

export const listItems = catchAsync(async (req: Request, res: Response) => {
  const {
    search,
    status,
    page = 1,
    limit = 10,
  } = req.query as {
    search?: string;
    status?: ItemDocument["status"];
    page?: number;
    limit?: number;
  };

  const filter = buildFilter({ search, status });
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Item.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Item.countDocuments(filter),
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

export const getItem = catchAsync(async (req: Request, res: Response) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Item not found");
  }

  return res.json({ success: true, data: item });
});

export const updateItem = catchAsync(async (req: Request, res: Response) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Item not found");
  }

  return res.json({ success: true, data: item });
});

export const deleteItem = catchAsync(async (req: Request, res: Response) => {
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Item not found");
  }

  return res.status(StatusCodes.NO_CONTENT).json({ success: true });
});
