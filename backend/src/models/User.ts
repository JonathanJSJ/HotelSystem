import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../interfaces/IUser.js";

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
