import { NextFunction, Request, Response } from "express";
import {
  createHotel,
  deleteHotel,
  getAvailableHotels,
  getHotelById,
  getHotels,
  updateHotel,
} from "../services/hotelService.js";

export const getHotelsPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const itens = parseInt(req.query.itens as string) || 6;

    const hotels = await getHotels(page, itens);
    res.json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getHotelsWithFilters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { checkin, checkout, single, double, suite, familysuite } = req.query;

    let checkinDate: Date;
    let checkoutDate: Date;
    
    if (checkin === "undefined") {
      checkinDate = new Date();
    } else {
      checkinDate = new Date(checkin as string);
    }

    if (checkout === "undefined") {
      checkoutDate = new Date();
    } else {
      checkoutDate = new Date(checkout as string);
    }

    const roomsMap = new Map<string, number>();

    if (single != "undefined")
      roomsMap.set("Single", parseInt(single as string));
    if (double != "undefined")
      roomsMap.set("Double", parseInt(double as string));
    if (suite != "undefined") 
      roomsMap.set("Suite", parseInt(suite as string));
    if (familysuite != "undefined")
      roomsMap.set("Family Suite", parseInt(familysuite as string));

    const availableHotels = await getAvailableHotels(
      checkinDate,
      checkoutDate,
      roomsMap
    );

    res.json(availableHotels);
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.id;

    const hotel = await getHotelById(hotelId);
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

export const postHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotel = await createHotel(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const putHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedHotel = await updateHotel(req.params.id, req.body);
    res.json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteHotel(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
