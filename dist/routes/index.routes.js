"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const category_routes_1 = require("./category.routes");
const task_routes_1 = require("./task.routes");
const router = express_1.Router();
router.use('/auth', auth_routes_1.authRouter);
router.use('/users', user_routes_1.userRouter);
router.use('/categories', category_routes_1.categoryRouter);
router.use('/tasks', task_routes_1.taskRouter);
exports.default = router;
//# sourceMappingURL=index.routes.js.map