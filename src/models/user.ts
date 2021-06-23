import { User } from "../types/users";
import { db } from "../database";
import { OkPacket, RowDataPacket} from "mysql2";


export const create = (user: User, callback: Function) => {
    const queryString = "INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)"
    db.query(
      queryString,
      [user.name, user.lastname, user.email, user.password],
      (err, result) => {
        if (err) {callback(err)};
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const existUser = (email: string, callback: Function) => {
    const queryString = `SELECT * FROM users WHERE email=?`;
    var data = "";
    db.query(queryString, email, (err, result) => {
        if (err) {callback(err)}
        const row = (<RowDataPacket> result)[0];
        if(row){
            data = row.email;
        } 
        callback(null, data);
    });
  }