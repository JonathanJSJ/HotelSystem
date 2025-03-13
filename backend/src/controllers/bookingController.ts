import { NextFunction, Request, Response } from "express";
import {
  deleteBookingById,
  getBookingsByRoom,
  getBookingsByUser,
  postBooking,
} from "../services/bookingService.js";
import { IBooking } from "../interfaces/IBooking.js";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.js";
import { HttpError } from "../interfaces/HttpError.js";

export const postUserBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new HttpError();

    const data: Omit<IBooking, "user_id"> = req.body;
    const newBooking: IBooking = { ...data, user_id: userId };
    const booking = await postBooking(newBooking);

    res.json(booking);
  } catch (err) {
    next(err);
  }
};

export const getUserBookings = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id + "";
    const bookings = await getBookingsByUser(userId);

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getRoomBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomId = req.params.id;
    const bookings = await getBookingsByRoom(roomId);

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const deleteUserBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id + "";
    const bookingId = req.params.id;

    await deleteBookingById(bookingId, userId);

    res.json(204).send()
  } catch (err) {
    next(err);
  }
};
