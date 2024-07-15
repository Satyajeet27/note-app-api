import mongoose, { Schema } from "mongoose";
import { Note } from "../types/note.types";

const noteSchema = new mongoose.Schema<Note>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model<Note>("notes", noteSchema);
export default Notes;
