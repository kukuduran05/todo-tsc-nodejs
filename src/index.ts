import express, { urlencoded } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandlers';
import { notFoundHandler } from './middleware/notFoundHandler';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

// Swagger
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";

// Initialize configuration
dotenv.config();

// Routes
import IndexRoutes from './routes/index.routes';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
createConnection();
const PORT: number = parseInt(process.env.PORT as string, 10);

// Middlewares
app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const specs = swaggerJSDoc(options);

// Api routes
app.use(IndexRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// Catch 404
app.use(notFoundHandler);

// Errors
app.use(errorHandler);


// Start the Express server
app.listen(PORT, () => {
    console.log( `Server started at http://localhost:${ PORT }` );
});