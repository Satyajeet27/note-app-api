import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/user.routes";
import globalError from "./middlewares/globalError";
import notesRoutes from "./routes/note.routes";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/notes", notesRoutes);

app.use(globalError);
export default app;
