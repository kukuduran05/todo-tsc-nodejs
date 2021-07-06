import express, { urlencoded } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandlers';
import { notFoundHandler } from './middleware/notFoundHandler';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

// Initialize configuration
dotenv.config();

// Routes
import IndexRoutes from './routes/index.routes';

const app = express();
createConnection();
const PORT: number = parseInt(process.env.PORT as string, 10);

// Middlewares
app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Api routes
app.use(IndexRoutes);

// Catch 404
app.use(notFoundHandler);

// Errors
app.use(errorHandler);


// Start the Express server
app.listen(PORT, () => {
    console.log( `Server started at http://localhost:${ PORT }` );
});