"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const users_controller_1 = require("../controllers/users.controller");
const categories_controller_1 = require("../controllers/categories.controller");
const tasks_controller_1 = require("../controllers/tasks.controller");
const router = express_1.Router();
router.route('/register')
    .post(auth_controller_1.register);
router.route('/login')
    .post(auth_controller_1.login);
router.route('/users')
    .get(users_controller_1.getAllUsers);
router.route('/users/:userId')
    .get(users_controller_1.getOneUser)
    .delete(users_controller_1.deleteUser)
    .put(users_controller_1.updateUser);
router.route('/categories')
    .post(categories_controller_1.createCategory)
    .get(categories_controller_1.getAllCategories);
router.route('/categories/:categoryId')
    .get(categories_controller_1.getOneCategory)
    .delete(categories_controller_1.deleteCategory)
    .put(categories_controller_1.updateCategory);
router.route('/tasks')
    .post(tasks_controller_1.createTask)
    .get(tasks_controller_1.getAllTasks);
router.route('/tasks/:taskId')
    .get(tasks_controller_1.getOneTask)
    .delete(tasks_controller_1.deleteTask)
    .put(tasks_controller_1.updateTask);
exports.default = router;
//# sourceMappingURL=index.routes.js.map