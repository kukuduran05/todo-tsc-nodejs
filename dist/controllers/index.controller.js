"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_login = exports.get_login = exports.home = void 0;
function home(req, res) {
    // Si ya iniciamos sesion mostrar bienvenida
    // Si no hemos iniciado sesion redireccionar a /login
    return res.send(`The API is at http://localhost:${process.env.PORT}`);
}
exports.home = home;
function get_login(req, res) {
    // Mostrar el formulario de login
    return res.send("Deberia mostrar la vista de login!");
}
exports.get_login = get_login;
function post_login(req, res) {
    return res.send("Recibir credenciales");
}
exports.post_login = post_login;
//# sourceMappingURL=index.controller.js.map