"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DB
//import { connect } from '../database';
//import { MemoryStore } from 'express-session';
/*
export async function register(req: Request, res: Response): Promise<Response> {
   const password = req.body.password;
   // Generate salt to hash password
   const salt = await bcrypt.genSalt(10);
   const encryptedPassword = await bcrypt.hash(password, salt);
   let created = new Date();
   var users = {
      "name": req.body.name,
      "lastname": req.body.lastname,
      "email": req.body.email,
      "password": encryptedPassword,
      //"created_at": Date.now()
   }
   
   const conn = await connect();
   await conn.query('INSERT INTO users SET ?', users, function (error, results, fields){
      if (error) throw error;
      return results;
   });
   return res.send({
      message: 'User created Successfully',
      data: users
   });
   //return res.send(`The API is at http://localhost:${process.env.PORT}`);
}

export async function login(req: Request, res: Response): Promise<Response> {
   const email = req.body.email;
   const conn = connect();
   var sql = 'SELECT * FROM users WHERE email = ' + mysql.escape(email);
   let usrs = (await conn).query(sql, function(err, res){
      return res;
   });
   console.log(usrs);


   // Show form login
   return res.send("Deberia mostrar la vista de login!");
}

export function post_login(req: Request, res: Response): Response {
   
   return res.send("Recibir credenciales");
}*/
//# sourceMappingURL=index.controller.js.map