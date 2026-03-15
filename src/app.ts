import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import { indexRoute } from './app/routes';


const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/auth', indexRoute);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Green Bangladesh API!');
});

export default app;
