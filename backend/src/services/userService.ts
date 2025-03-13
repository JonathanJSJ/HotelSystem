import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import User from "../models/User.js";
import { HttpError } from "../interfaces/HttpError.js";

type UserResponse = {
  _id: ObjectId;
  name: string;
  email: string;
  token?: string;
};

const generateToken = (id: ObjectId, name: string): string => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET as string, {
    expiresIn: "6h",
  });
};

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<UserResponse> {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new HttpError("Email already in use", 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id, user.name),
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<UserResponse> {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError("Invalid email or password", 401);
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id, user.name),
  };
}

export async function updateUser(
  userId: ObjectId,
  updates: Partial<{ name: string; email: string; password: string }>
): Promise<UserResponse> {
  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }

  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  if (!user) {
    throw new HttpError("User not found", 404);
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}

export async function deleteUserById(
  userId: ObjectId
): Promise<{ message: string }> {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new HttpError("User not found", 404);
  }
  return { message: "User deleted successfully" };
}
