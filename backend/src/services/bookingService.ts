import { HttpError } from "../interfaces/HttpError.js";
import { IBooking } from "../interfaces/IBooking.js";
import { IHotel } from "../interfaces/IHotel.js";
import { Booking } from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import { IRoom, Room } from "../models/Room.js";

export async function postBooking(bookingData: IBooking) {
  const booking = new Booking(bookingData);
  const savedBooking = booking.save();

  return savedBooking;
}

export async function getBookingsByUser(
  userId: string
): Promise<Array<any>> {
  const bookingsData = await Booking.find({ user_id: userId });
  let userBookings: any[] = [];

  for (let booking of bookingsData) {
    if(booking.start_date.getTime() < (new Date()).getTime()){
      continue
    }

    const room: IRoom | null = await Room.findById(booking.room_id);
    if (!room) {
      throw new HttpError();
    }

    const hotel: IHotel | null = await Hotel.findById(room.hotel_id);
    if (!hotel) {
      throw new HttpError();
    }

    userBookings.push({
      _id: booking._id,
      hotel_name: hotel.name,
      start_date: booking.start_date,
      end_date: booking.end_date,
    });
  }
  return userBookings;
}

export async function getBookingsByRoom(
  roomId: string
): Promise<Array<IBooking>> {
  const bookings = await Booking.find({ room_id: roomId });
  return bookings;
}

export async function deleteBookingById(bookingId: string, userId: string) {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new HttpError("Booking not found.", 404);
  }

  if (booking.user_id + "" != userId) {
    throw new HttpError("User can't cancel other people bookings", 409);
  }

  if (!("start_date" in booking)) {
    throw new HttpError();
  }

  const startDate = booking.start_date;
  const isPossibleToCancel = isTimeDiffGreaterThanNDays(startDate, 3);

  if (!isPossibleToCancel) {
    throw new HttpError("Cancellation deadline exceeded.", 422);
  }

  const deletedBooking = await Booking.findByIdAndDelete(booking.id);

  if (!deletedBooking) {
    throw new HttpError();
  }
}

function isTimeDiffGreaterThanNDays(startDate: Date, n: number) {
  const now = new Date();

  const timeDiff = startDate.getTime() - now.getTime();
  const diffInDays = timeDiff / (1000 * 60 * 60 * 24);

  return diffInDays > n;
}
