"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index.controller");
const router = express_1.Router();
router.route('/')
    .get(index_controller_1.home);
/*router.route('/login')
    .get(login)
    .post(credentials)*/
exports.default = router;
//# sourceMappingURL=auth.routes.js.map