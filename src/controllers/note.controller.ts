import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Notes from "../model/notes.model";
import { AuthRequest } from "../middlewares/authenticate";

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, tags } = req.body;
  if (!title || !description || !tags.length) {
    return next(createHttpError(400, "All fields are required"));
  }
  const user = (req as AuthRequest).user;
  try {
    const newNote = await Notes.create({
      title,
      description,
      tags,
      user,
    });
    res.status(201).send({
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Something went wrong with create note api"));
  }
};

export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthRequest).user;
  try {
    const notes = await Notes.find({ user: userId });
    if (!notes) {
      return next(createHttpError(404, "No any notes available"));
    }
    // console.log(notes);
    return res.status(200).send({
      message: "Notes found",
      notes,
    });
  } catch (error) {
    next(createHttpError(500, "Something went wrong with get all notes api"));
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { noteId } = req.params;

  const { title, description, tags } = req.body;
  try {
    const notes = await Notes.findByIdAndUpdate(
      { _id: noteId },
      {
        $set: {
          title,
          description,
          tags,
        },
      },
      { new: true }
    );
    return res.status(200).send({
      notes,
    });
  } catch (error) {
    next(createHttpError(500, "Something went wrong with get all notes api"));
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { noteId } = req.params;
  try {
    await Notes.findByIdAndDelete({ _id: noteId });
    return res.status(204).send({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(createHttpError(500, "Something went wrong with get all notes api"));
  }
};
