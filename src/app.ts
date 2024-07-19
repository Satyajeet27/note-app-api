import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/user.routes";
import globalError from "./middlewares/globalError";
import notesRoutes from "./routes/note.routes";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("testing server");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/notes", notesRoutes);

app.use(globalError);
export default app;
