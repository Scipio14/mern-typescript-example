import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  //The use of select here means that we retrieving the info from the database it won't return the email nor the password and if we want to access it we would have to request it directly
  email: { type: String, require: true, select: false, unique: true },
  password: { type: String, require: true, select: false },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
