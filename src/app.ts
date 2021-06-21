import express, { Application } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';

// Routes
import IndexRoutes from './routes/index.routes';
import AuthRoutes from './routes/auth.routes';

export class App {

    private app: Application;
    
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); // session secret
        this.app.use(passport.initialize());
        this.app.use(passport.session()); // persistent login sessions
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/auth', AuthRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}