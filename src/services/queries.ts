import express, { NextFunction, Request, Response } from "express";
import MySQL from './database';
import { RowDataPacket } from "mysql2";
import { errorMiddleware, successfullMiddleware} from '../middleware/error';

export function findAll(table: string, req: Request, res: Response, next: NextFunction) {
    try {
        const query = `SELECT * FROM ${table}`;
        MySQL.query(query, (err: Error, results: any) => {
            if (err) {console.log(err)}
            const list = (<RowDataPacket> results);
            if (list){
                const data = {
                    data: list
                }
                successfullMiddleware(data, req, res, next);
            } else {
                const data = {
                    data: []
                }
                successfullMiddleware(data, req, res, next);
            }
        });
    } catch (error) {
        errorMiddleware(error, req, res, next);
    }
}

export function findOne(data: any, req: Request, res: Response, next: NextFunction) {
    try {
        const query = `SELECT * FROM ${data.table} WHERE ${data.field} = ${data.id}`;
        MySQL.query(query, (err: Error, results: any) => {
            if (err) {console.log(err)}
            const info = (<RowDataPacket> results);
            const data = {
                data: info
            }
            successfullMiddleware(data, req, res, next);
        });
    } catch (error) {
        errorMiddleware(error, req, res, next);
    }
}

export function deleteRecord(data: any, req: Request, res: Response, next: NextFunction) {
    try{
        const query = `DELETE FROM ${data.table} WHERE ${data.field} = ${data.id}`;
        MySQL.query(query, (err: Error, results: any) => {
            if (err) {console.log(err)}
            //const userDeleted = (<RowDataPacket> results);
            const info = {
                data: `The record with Id ${data.id} in table ${data.table} was deleted successfully!`
            }
            successfullMiddleware(info, req, res, next);
        });
    } catch(error) {
        errorMiddleware(error, req, res, next);
    }
}