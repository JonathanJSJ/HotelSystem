import { Request, Response, NextFunction } from "express";
import {
  createRoom,
  deleteRoomById,
  getRoomsWithStatus,
  updateRoom,
} from "../services/roomsService.js";

export const getHotelRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.id;
    const { startDate, endDate } = req.query;

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    const rooms = await getRoomsWithStatus(hotelId, start, end);
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const postRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const room = await createRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

export const putRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedRoom = await updateRoom(id, req.body);
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteRoomById(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
