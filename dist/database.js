"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
// Create connection to DB
exports.db = mysql2_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
});
/*export async function connect () {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DB
    });

    connection.connect(function(err){
        if (err) {
            console.log('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connection stablished!');
    });

    return connection;
}*/ 
//# sourceMappingURL=database.js.map