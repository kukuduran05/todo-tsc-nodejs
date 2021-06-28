import express, { urlencoded } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './helpers/handle_errors';

// Initialize configuration
dotenv.config();

// Routes
import IndexRoutes from './routes/index.routes';

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10);

// Middlewares
app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Api routes
app.use(IndexRoutes);

app.use(errorHandler);

// Start the Express server
app.listen(PORT, () => {
    console.log( `Server started at http://localhost:${ PORT }` );
});