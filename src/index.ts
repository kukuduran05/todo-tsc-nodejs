import express, { urlencoded } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

// Initialize configuration
dotenv.config();

// Routes
import { authRouter} from "./routes/index.routes";
//import UsersRoutes from './routes/users.routes';
//import CategoryRoutes from './routes/categories.routes';

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10);

// Middlewares
app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Api routes
app.use('/auth', authRouter);
//app.use('/users', UsersRoutes);
//app.use('/categories', CategoryRoutes);

// Start the Express server
app.listen(PORT, () => {
    console.log( `Server started at http://localhost:${ PORT }` );
});