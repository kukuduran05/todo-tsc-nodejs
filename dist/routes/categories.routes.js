"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const router = express_1.Router();
router.route('/')
    .get(categories_controller_1.listCategories)
    .post(categories_controller_1.createCategory);
router.route('/:categoryId')
    .get(categories_controller_1.getCategory)
    .delete(categories_controller_1.deleteCategory)
    .put(categories_controller_1.updateCategory);
exports.default = router;
//# sourceMappingURL=categories.routes.js.map