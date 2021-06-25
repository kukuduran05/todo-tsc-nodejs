import { User } from "../types/users";
import MySQL from "../services/database";
import { RowDataPacket } from "mysql2";

/* export const create = (user: User, callback: Function) => {
    const query = `INSERT INTO users (name, lastname, email, password) 
      VALUES (${MySQL.escape(user.name)}, ${MySQL.escape(user.lastname)}, ${MySQL.escape(user.email)}, ${MySQL.escape(user.password)})`
    MySQL.query(query, (err: Error, results:Object[]) => {
      if (err) {callback(err)}
      const user = (<RowDataPacket> results);
      callback(null, results);  
    });
}; */

export function existUser(email: string, callback: Function) {
  const query = `SELECT * FROM users WHERE email = ${MySQL.escape(email)}`;
  MySQL.query(query, (err: Error, results:any) => {
    if (err) {callback(err)}
    const user = (<RowDataPacket> results[0]);
    console.log(results[0].userId);
    callback(null, user);
  });
}