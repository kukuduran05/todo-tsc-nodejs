import { Request, Response } from 'express';


export function home(req: Request, res: Response): Response {
   // Si ya iniciamos sesion mostrar bienvenida
   
   // Si no hemos iniciado sesion redireccionar a /login
   return res.send(`The API is at http://localhost:${process.env.PORT}`); 
}

export function get_login(req: Request, res: Response): Response {
   // Mostrar el formulario de login
   return res.send("Deberia mostrar la vista de login!");
}

export function post_login(req: Request, res: Response): Response {
   
   return res.send("Recibir credenciales");
}
