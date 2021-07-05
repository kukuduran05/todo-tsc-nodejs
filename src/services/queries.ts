import { connect } from './database';
import Jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql";

export const save = (table: string, fields: any, values: any) => new Promise((resolve, reject) => {
    connect.getConnection((err, connection) => {
        connection.release();
        if (err) reject(err);
        console.log('MySQL Connection Established: ', connection.threadId);
        // Generate Query
        var query = `INSERT INTO ${table} (${fields}) VALUES (?)`;
        connection.query(query, [values], (err, results) => {
            if (err) reject(err);
            // TODO get inserted values
            resolve(results);
        });
    })
});

export const findAll = (table: string, fields = [], conditions = '') => new Promise((resolve, reject) => {
    connect.getConnection((err, connection) => {
        if (err) reject(err);
        console.log('MySQL Connection Established: ', connection.threadId);
        // Generate Query
        var query = `SELECT `;
        fields.length != 0 ? query = query + fields.join() + ' ' : query = query + ' * ';
        query = query + `FROM ${table}`;
        conditions != '' ? query = query + ' ' +conditions : query = query;
        console.log(query);
        // Execute Query
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
});

export const findOne = (table: string, field: string, fieldValue: any, fields = [], conditions = '') => new Promise((resolve, reject) => {
    connect.getConnection((err, connection) => {
        if (err) reject(err);
        console.log('MySQL Connection Established: ', connection.threadId);
        // Generate Query
        var query = `SELECT `;
        fields.length != 0 ? query = query + fields.join() + ' ' : query = query + ' * ';
        query = query + `FROM ${table} WHERE ${field} = '${fieldValue}'`;
        conditions != '' ? query = query + ' ' +conditions : query = query;
        // Execute Query
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
});

export const updateRecord = (table: string, field:string, keys: any, values: any, id: number, conditions = '') => new Promise((resolve, reject) => {
    connect.getConnection((err, connection) => {
        if (err) reject(err);
        console.log('MySQL Connection Established: ', connection.threadId);
        // GENERATE QUERY
        var query = `UPDATE ${table} SET `;
        let vals = [];
        for (let i = 0; i < keys.length; i++) {
            vals.push(keys[i] + '=' + `'${values[i]}'`);
        }
        query = query + `${vals} WHERE ${field} = ${id}`;
        conditions != '' ? query = query + ' ' +conditions : query = query;
        connection.query(query, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
});

export const deleteRecord = (table: string, field: string, id: number) => new Promise((resolve, reject) => {
    connect.getConnection((err, connection) => {
        if (err) reject(err);
        console.log('MySQL Connection Established: ', connection.threadId);
        // Generate Query
        const query = `DELETE FROM ${table} WHERE ${field} = ${id}`;
        // Execute Query
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
});

export async function getCurrentUser(req: any) {
    const token = req.header('auth-token');
    var secret: any = process.env.TOKEN_SECRET;
    const currentUser:any = Jwt.decode(token, secret);
    const user = await findOne('users', 'email', currentUser.email);
    let userData = (<RowDataPacket> user);
    let userInfo = {
        id: userData[0].userId,
        email: userData[0].email
    }
    return userInfo;
}