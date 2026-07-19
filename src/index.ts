import express, {
  type Request,
  type Response,
  type Application,
} from "express";
const app: Application = express();
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./openapi.json" with { type: "json" };
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.post("/tasks", (req: Request, res: Response) => {
  const title: string = req.body.title;

  if (title == "") {
    res.status(400).json("title is empty");
    return;
  }

  const newTask: Task = {
    id: tasks.length + 1,
    title,
    done: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  if (
    typeof req.body.title !== "string" ||
    req.body.title.trim() === "" ||
    typeof req.body.done !== "boolean"
  ) {
    res.status(400).json({
      error: "Title must be a non-empty string and done must be a boolean.",
    });
    return;
  }
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).json({
      error: `Task ${id} not found`,
    });
    return;
  }
  task.title = req.body.title;
  task.done = req.body.done;
  res.status(200).json(task);
});

app.delete("/tasks/:id", (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    res.status(404).json({
      error: `Task ${id} not found`,
    });
    return;
  }
  const deletedTask = tasks.splice(index, 1)[0];
  res.status(200).json({
    message: "Task deleted successfully",
  });
});

const PORT: number = 3000;

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
