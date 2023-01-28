import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import * as path from "path";
import morgan from "morgan";
import { notesRoutes, rootRoute } from "./routes";
import { logger, logEvents } from "./middleware/logger";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

// app.use(morgan("dev"));
app.use(logger);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

//Routes
app.use("/", rootRoute);
app.use("/api/notes", notesRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "Unknown error";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
