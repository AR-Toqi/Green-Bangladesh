import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { indexRoute } from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './app/lib/auth';
import { envConfig } from './config';

const app: Application = express();


app.use(cors(
  {
    origin: [envConfig.FRONTEND_URL, envConfig.BETTER_AUTH_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }
));

app.use("/api/auth", toNodeHandler(auth));

// Parsers
app.use(express.json());
app.use(cookieParser());

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
