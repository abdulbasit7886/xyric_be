import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItem,
  listItems,
  updateItem,
} from "../controllers/item.controller";
import { validate } from "../middleware/validate";
import {
  createItemSchema,
  getItemSchema,
  listItemSchema,
  updateItemSchema,
} from "../validators/item.validator";

const router = Router();

router
  .route("/")
  .get(validate(listItemSchema), listItems)
  .post(validate(createItemSchema), createItem);

router
  .route("/:id")
  .get(validate(getItemSchema), getItem)
  .put(validate(updateItemSchema), updateItem)
  .delete(validate(getItemSchema), deleteItem);

export default router;
