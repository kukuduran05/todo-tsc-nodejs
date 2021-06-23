"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const userModel = __importStar(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    // generate salt to hash password
    const salt = yield bcrypt_1.default.genSalt(10);
    const password = yield bcrypt_1.default.hash(req.body.password, salt);
    newUser.password = password;
    userModel.create(newUser, (err, userId) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "orderId": userId, "data": newUser });
    });
}));
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    userModel.existUser(email, (err, user) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        if (user != "") {
            // TODO Access to Welcome
            console.log('Welcome to API');
        }
        else {
            // TODO redirect to /login
            console.log('/auth/login');
            res.redirect('http://localhost/auth/login');
        }
    });
}));
//# sourceMappingURL=index.routes.js.map