import { Request, Response, NextFunction } from "express";
import { HttpError } from "../interfaces/HttpError.js";

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status === 500) {
    console.error(err.stack);
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
