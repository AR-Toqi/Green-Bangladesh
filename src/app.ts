import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { indexRoute } from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api/v1', indexRoute);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Green Bangladesh API!');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Handler
app.use(notFound);

export default app;
