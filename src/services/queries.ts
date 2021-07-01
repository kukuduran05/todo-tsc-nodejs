import { RowDataPacket } from "mysql2";
import { conn } from '../services/database';

export function save(query: string, values: any) {
    return new Promise((resolve, reject) => {
        conn.query(query, values, function(err, data, fields) {
            if (err) { reject(err) };
            const recordNew = (<RowDataPacket> data);
            resolve(recordNew);
        });
    });
}

export async function findAll(table: string) {
    const query = `SELECT * FROM ${table}`;
    return new Promise((resolve, reject)=>{
        conn.query(query, function(err, data, fields) {
            if (err) { reject(err) };
            const getAllRecords = (<RowDataPacket> data);
            resolve(getAllRecords);
        });
    });
}


export function findOne(table: string, field: string, id: number) {
    const query = `SELECT * FROM ${table} WHERE ${field} = ${id}`;
    return new Promise((resolve, reject) => {
        conn.query(query, function(err, data, fields) {
            if (err) {reject(err)}
            const getRecord = (<RowDataPacket> data);
            resolve(getRecord);
        });
    });
}

export function findByEmail(query: any) {
    return new Promise((resolve, reject) => {
        conn.query(query, function(err, data, fields) {
            if (err) { reject(err) };
            const getRecord = (<RowDataPacket> data);
            resolve(getRecord);
        });
    });
}

export function updateRecord(query: any, values: any) {
    return new Promise((resolve, reject) => {
        conn.query(query, values, function(err, data, fields) {
            if (err) { reject(err) };
            const updatedRecord = (<RowDataPacket> data);
            resolve(updatedRecord);
        });
    });
}

export function deleteRecord(table: string, field: string, id: number) {
    const query = `DELETE FROM ${table} WHERE ${field} = ${id}`;
    return new Promise((resolve, reject) => {
        conn.query(query, function(err, data, fields) {
            if (err) { reject(err) };
            const updatedRecord = (<RowDataPacket> data);
            resolve(updatedRecord);
        });
    });
}