import { OkPacket, RowDataPacket } from 'mysql';
import { connect } from './database';

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

export const findAll = (table: string, fields = []) => new Promise((resolve, reject) => {
    connect.getConnection((err, connection) => {
        if (err) reject(err);
        console.log('MySQL Connection Established: ', connection.threadId);
        // Generate Query
        var query = `SELECT `;
        fields.length != 0 ? query = query + fields.join() + ' ' : query = query + ' * ';
        query = query + `FROM ${table}`;
        // Execute Query
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
});

export const findOne = (table: string, field: string, fieldValue: any, fields = []) => new Promise((resolve, reject) => {
    connect.getConnection((err, connection) => {
        if (err) reject(err);
        console.log('MySQL Connection Established: ', connection.threadId);
        // Generate Query
        var query = `SELECT `;
        fields.length != 0 ? query = query + fields.join() + ' ' : query = query + ' * ';
        query = query + `FROM ${table} WHERE ${field} = '${fieldValue}'`;
        // Execute Query
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
});

export const updateRecord = (table: string, field:string, keys: any, values: any, id: number) => new Promise((resolve, reject) => {
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
        console.log(query);
        //const query = `SELECT * FROM ${table} WHERE ${field} = ${id}`;
        connection.query(query, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
});

export function userExist(user: any) {
    if (user == 0) {
        return false;
    } else {
        return true;
    }
}

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