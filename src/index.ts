import express, {
  type Request,
  type Response,
  type Application,
} from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    name: "Task API",
    version: "1.0",
    endpoints: "[/tasks]",
  });
});

app.get("/health", (req:Request, res:Response): void => {
  res.status(200).json({
    status: "ok"
  })
})

const PORT: number = 3000;

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
