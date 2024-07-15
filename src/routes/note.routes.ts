import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/note.controller";
import { authentication } from "../middlewares/authenticate";

const router = Router();

router.post("/", authentication, createNote);
router.get("/", authentication, getAllNotes);
router.put("/:noteId", authentication, updateNote);
router.delete("/:noteId", authentication, deleteNote);

export default router;
