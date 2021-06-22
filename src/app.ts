import express, { Application, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import IndexRoutes from './routes/index.routes';
import CategoriesRoutes from './routes/categories.routes';
import UsersRoutes from './routes/users.routes';

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
        this.app.use(urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(cors());  
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/categories', CategoriesRoutes);
        this.app.use('/users', UsersRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}