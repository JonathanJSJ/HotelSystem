import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.js";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.js";
import { NextFunction, Response } from "express";

export const authCheck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");

      if (user && "_id" in user) {
        req.user = { id: user._id };
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
