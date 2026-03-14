import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Green Bangladesh API!');
});

export default app;
