import { Request, Response, NextFunction } from "express";
import {
  deleteUserById,
  loginUser,
  registerUser,
  updateUser,
} from "../services/userService.js";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.js";

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const putUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  const updates = req.body;
  try {
    if (!userId) throw new Error("Unauthorized");
    const updatedUser = await updateUser(userId, updates);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  try {
    if (!userId) throw new Error("Unauthorized");
    const response = await deleteUserById(userId);
    res.status(204).json({ message: response.message });
  } catch (error) {
    next(error);
  }
};
