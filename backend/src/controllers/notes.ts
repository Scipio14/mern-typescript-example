import { Request, Response, NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await NoteModel.find().exec();

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { noteId: id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Not a valid note id");
    }
    const note = await NoteModel.findById(id).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, text } = req.body;
  try {
    if (!title) {
      // return res.status(400).json({ message: "All notes must have a title" });
      throw createHttpError(400, "Note must have a title");
    } else {
      const newNote = await NoteModel.create({ title, text });
      return res.status(201).json(newNote);
    }
  } catch (error: unknown) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    //checking if there is not a valid id
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Not a valid note id");
    }
    //checking if the user has provided a title
    if (!newTitle) {
      throw createHttpError(400, "Note must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not Found");
    }

    note.title = newTitle;
    note.text = newText;
    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId: id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Not a valid note id");
    }

    const note = await NoteModel.findById(id).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    await note.remove();

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
