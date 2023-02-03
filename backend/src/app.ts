import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import * as path from "path";
import morgan from "morgan";
// import cors from "cors";
import { notesRoutes, rootRoute, usersRoutes } from "./routes";
// import { logger } from "./middleware/logger";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));
// app.use(logger);

app.use(express.json());
// app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);
//Routes
app.use("/", rootRoute);
app.use("/api/users", usersRoutes);
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
