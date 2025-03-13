import { Request, Response, NextFunction } from "express";

export const validateRoom = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, capacity, type, price, hotel_id } = req.body;

  if (!name || !capacity || !type || !price || !hotel_id) {
    throw new Error(
      "Missing required fields: name, capacity, type, price, and hotel_id are required."
    );
  }

  if (isNaN(capacity) || capacity <= 0) {
    throw new Error("Invalid capacity. It must be a positive number.");
  }

  if (isNaN(price) || price < 0) {
    throw new Error("Invalid price. It must be a positive number.");
  }

  const validTypes = ["Single", "Double", "Suite", "Family Suite"];
  if (!validTypes.includes(type)) {
    throw new Error(
      `Invalid type. It must be one of: ${validTypes.join(", ")}`
    );
  }

  if (!hotel_id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid hotel_id. It must be a valid ObjectId.");
  }

  next();
};
