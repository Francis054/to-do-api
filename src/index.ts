import express, {
  type Request,
  type Response,
  type Application,
} from "express";

const app: Application = express();

app.use(express.json());

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Learn Express",
    done: true,
  },
  {
    id: 2,
    title: "Learn TypeScript",
    done: false,
  },
  {
    id: 3,
    title: "Build a Todo API",
    done: false,
  },
];

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    name: "Task API",
    version: "1.0",
    endpoints: "[/tasks]",
  });
});

app.get("/health", (req: Request, res: Response): void => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/tasks", (req: Request, res: Response): void => {
  res.status(200).json({
    tasks,
  });
});

app.get("/tasks/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).json({
      error: `Task ${id} not found`,
    });
    return;
  }
  res.status(200).json(task);
});

const PORT: number = 3000;

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
