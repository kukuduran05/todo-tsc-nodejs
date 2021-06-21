import { createPool } from 'mysql2/promise';

export async function connect () {
    const connection = await createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DB,
        connectionLimit: 10
    });

    return connection;
}