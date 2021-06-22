"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jtwSecret: process.env.JTWT_SECRET || 'somesecrettoken',
    DB: {
        host: process.env.DB_HOST || 'http://localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DB
    }
};
//# sourceMappingURL=config.js.map