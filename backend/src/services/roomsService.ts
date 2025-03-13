import { HttpError } from "../interfaces/HttpError.js";
import { Room, IRoom } from "../models/Room.js";
import { getBookingsByRoom } from "./bookingService.js";

export async function getRooms(hotelId: String) {
  const rooms = await Room.find({ hotel_id: hotelId });
  return rooms;
}

export async function getRoomsWithStatus(
  hotelId: String,
  startDate: Date,
  endDate: Date
): Promise<IRoom[]> {
  const rooms = await Room.find({ hotel_id: hotelId });
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);

  for (const room of rooms) {
    const bookings = await getBookingsByRoom(room.id);
    let count = 0;

    for (const booking of bookings) {
      if (
        (booking.start_date.getTime() <= sDate.getTime() &&
          booking.end_date.getTime() >= sDate.getTime()) ||
        (booking.start_date.getTime() <= eDate.getTime() &&
          booking.end_date.getTime() >= eDate.getTime()) ||
        (booking.start_date.getTime() >= sDate.getTime() &&
          booking.end_date.getTime() <= eDate.getTime())
      ) {
        count++;
      }
    }

    if ("available_quantity" in room) {
      room.available_quantity -= count;
    }
  }

  return rooms;
}

export async function createRoom(roomData: IRoom): Promise<IRoom> {
  const room = new Room(roomData);
  return await room.save();
}

export async function updateRoom(
  id: string,
  roomData: Partial<IRoom>
): Promise<IRoom> {
  const updatedRoom = await Room.findByIdAndUpdate(id, roomData, {
    new: true,
  }).exec();
  if (!updatedRoom) {
    throw new HttpError("Room not found", 404);
  }
  return updatedRoom;
}

export async function deleteRoomById(id: string): Promise<void> {
  const deletedRoom = await Room.findByIdAndDelete(id).exec();
  if (!deletedRoom) {
    throw new HttpError("Room not found", 404);
  }
}
