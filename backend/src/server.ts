import app from "./app";
import env from "./util/validateEnv";

import mongoose from "mongoose";

const port: string | number = env.PORT as string | 5000;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log(`Server running on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });
