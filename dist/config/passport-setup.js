"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
require("../database");
passport_1.default.use(new passport_local_1.default(function (username, password, done) {
    if (username === "codigofacilito" && password === "12345678") {
        return done(null, { id: 1, name: "kuku" });
        done(null, false);
    }
}));
// used to serialize the user for the session
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
// used to deserialize the user
passport_1.default.deserializeUser(function (id, done) {
    /*connection.query("select * from users where id = "+id,function(err,rows){
        done(err, rows[0]);
    });*/
    done(null, { id: 1, name: "Cody" });
});
// load all the things we need
//# sourceMappingURL=passport-setup.js.map