import { IHotel } from "../interfaces/IHotel.js";
import Hotel from "../models/Hotel.js";
import { HttpError } from "../interfaces/HttpError.js";
import { getRooms, getRoomsWithStatus } from "./roomsService.js";
import IRoom from "../interfaces/IRoom.js";

export const createHotel = async (hotelInfo: IHotel) => {
  const hotel = new Hotel(hotelInfo);
  return await hotel.save();
};

export const getHotels = async (pageNum: number, itensNum: number) => {
  const skip = (pageNum - 1) * itensNum;

  const response = await Hotel.find().skip(skip).limit(itensNum);

  const hotels = await addHotelsStartPrice(response);

  return hotels;
};

export const getAvailableHotels = async (
  startDate: Date,
  endDate: Date,
  desiredRooms: Map<string, number>
) => {
  const allHotels = await Hotel.find();

  let availableHotels = [];

  for (let hotel of allHotels) {
    const hotelRooms: IRoom[] = await getRoomsWithStatus(
      hotel.id,
      startDate,
      endDate
    );

    let isAvailable = true;

    for (let [desiredRoomType, requiredQuantity] of desiredRooms) {
      const room: IRoom | undefined = hotelRooms.find(
        (room) => room.type === desiredRoomType
      );
      if (!room || room.available_quantity < requiredQuantity) {
        isAvailable = false;
        break;
      }
    }

    if (isAvailable) {
      availableHotels.push(hotel);
    }
  }

  availableHotels = await addHotelsStartPrice(availableHotels);

  return availableHotels;
};

export const getHotelById = async (hotelId: string) => {
  const hotel = await Hotel.findById(hotelId);

  return hotel;
};

export const updateHotel = async (hotelId: string, hotelUpdate: IHotel) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, hotelUpdate, {
    new: true,
  });

  if (!updatedHotel) {
    throw new HttpError("Hotel not found", 404);
  }

  return updatedHotel;
};

export const deleteHotel = async (hoteId: string) => {
  const deletedHotel = await Hotel.findByIdAndDelete(hoteId);

  if (!deletedHotel) {
    throw new HttpError("Hotel not found", 404);
  }
};

const addHotelsStartPrice = async (hotels: IHotel[]) => {
  let updatedHotelList: IHotel[] = [];

  for (let hotel of hotels) {
    const rooms: IRoom[] = await getRooms(hotel._id);
    let lowestPrice = 0;

    for (let room of rooms) {
      if (room.price < lowestPrice || lowestPrice === 0)
        lowestPrice = room.price;
    }

    updatedHotelList.push({
      _id: hotel._id,
      name: hotel.name,
      localization: hotel.localization,
      rate: hotel.rate,
      image_url: hotel.image_url,
      start_price: lowestPrice,
    });
  }

  return updatedHotelList;
};
