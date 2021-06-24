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
exports.updateCategory = exports.deleteCategory = exports.getOneCategory = exports.getAllCategories = exports.createCategory = void 0;
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for create category
        return res.json('Create category');
    });
}
exports.createCategory = createCategory;
function getAllCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for get all categories
        return res.json('Get all categories');
    });
}
exports.getAllCategories = getAllCategories;
function getOneCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for get a specific category
        return res.json('Get only one category');
    });
}
exports.getOneCategory = getOneCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for delete a specific category
        return res.json('Delete category');
    });
}
exports.deleteCategory = deleteCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO code for delete a specific category
        return res.json('Update category');
    });
}
exports.updateCategory = updateCategory;
//# sourceMappingURL=categories.controller.js.map