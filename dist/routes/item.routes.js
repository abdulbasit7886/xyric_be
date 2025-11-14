"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const validate_1 = require("../middleware/validate");
const item_validator_1 = require("../validators/item.validator");
const router = (0, express_1.Router)();
router
    .route("/")
    .get((0, validate_1.validate)(item_validator_1.listItemSchema), item_controller_1.listItems)
    .post((0, validate_1.validate)(item_validator_1.createItemSchema), item_controller_1.createItem);
router
    .route("/:id")
    .get((0, validate_1.validate)(item_validator_1.getItemSchema), item_controller_1.getItem)
    .put((0, validate_1.validate)(item_validator_1.updateItemSchema), item_controller_1.updateItem)
    .delete((0, validate_1.validate)(item_validator_1.getItemSchema), item_controller_1.deleteItem);
exports.default = router;
//# sourceMappingURL=item.routes.js.map