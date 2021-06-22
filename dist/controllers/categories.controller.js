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
exports.updateCategory = exports.deleteCategory = exports.getCategory = exports.createCategory = exports.listCategories = void 0;
// DB
const database_1 = require("../database");
function listCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const cats = yield conn.query('SELECT * FROM categories');
            return res.json(cats[0]);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.listCategories = listCategories;
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCat = req.body;
        const conn = yield database_1.connect();
        yield conn.query('INSERT INTO categories SET ?', [newCat]);
        res.json({
            message: 'New Category Created'
        });
    });
}
exports.createCategory = createCategory;
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        const conn = yield database_1.connect();
        const cats = yield conn.query('SELECT * FROM categories WHERE id = ?', [id]);
        res.json(cats[0]);
    });
}
exports.getCategory = getCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        const conn = yield database_1.connect();
        yield conn.query('DELETE FROM categories WHERE id = ?', [id]);
        res.json({
            message: 'Category deleted'
        });
    });
}
exports.deleteCategory = deleteCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        const updatePost = req.body;
        const conn = yield database_1.connect();
        yield conn.query('UPDATE categories set ? WHERE id = ?', [updatePost, id]);
        res.json({
            message: 'Category Updated'
        });
    });
}
exports.updateCategory = updateCategory;
//# sourceMappingURL=categories.controller.js.map