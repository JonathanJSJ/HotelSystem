import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "../interfaces/IBooking.js";

const bookingSchema = new Schema<IBooking>(
  {
    client_first_name: {type: String, required: true},
    client_last_name: {type: String, required: true},
    client_phone_number: {type: String, required: true},
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    room_id: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export { Booking };
