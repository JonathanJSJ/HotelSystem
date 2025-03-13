import IRoom, { RoomType, RoomStatus } from "./../interfaces/IRoom.js";
import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true},
    type: {
      type: String,
      enum: ["Single", "Double", "Suite", "Family Suite"],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    available_quantity: { type: Number, required: true, min: 1 },
    hotel_id: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  },
  { timestamps: true }
);

const Room = mongoose.model<IRoom>("Room", roomSchema);
export { Room, IRoom, RoomType, RoomStatus };
