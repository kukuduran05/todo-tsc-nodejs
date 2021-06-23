"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existUser = exports.create = void 0;
const database_1 = require("../database");
const create = (user, callback) => {
    const queryString = "INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)";
    database_1.db.query(queryString, [user.name, user.lastname, user.email, user.password], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const existUser = (email, callback) => {
    const queryString = `SELECT * FROM users WHERE email=?`;
    var data = "";
    database_1.db.query(queryString, email, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            data = row.email;
        }
        callback(null, data);
    });
};
exports.existUser = existUser;
//# sourceMappingURL=user.js.map