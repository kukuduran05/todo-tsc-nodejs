"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const users_controller_1 = require("../controllers/users.controller");
router.route('/')
    .get(users_controller_1.listUsers)
    .post(users_controller_1.createUser);
router.route('/:userId')
    .get(users_controller_1.getUser)
    .delete(users_controller_1.deleteUser)
    .put(users_controller_1.updateUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map