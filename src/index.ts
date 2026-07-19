import express, { type Request, type Response, type Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.status(200).send('Hello World!');
});

const PORT: number = 3000;

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});