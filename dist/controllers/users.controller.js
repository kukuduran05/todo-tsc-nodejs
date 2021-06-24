"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getOneUser = exports.getAllUsers = void 0;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for get all users
        return res.json('Get all users');
    });
}
exports.getAllUsers = getAllUsers;
function getOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for get a specific user
        return res.json('Get only one user');
    });
}
exports.getOneUser = getOneUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for delete a specific user
        return res.json('Delete user');
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for delete a specific user
        return res.json('Update user');
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=users.controller.js.map