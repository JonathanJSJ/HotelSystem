import { ObjectId } from "mongoose";

export default interface IRoom extends Document {
  _id: ObjectId;
  name: string;
  type: RoomType;
  price: number;
  capacity: number;
  available_quantity: number;
  hotel_id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type RoomType = "Single" | "Double" | "Suite" | "Family Suite";
export type RoomStatus = "Available" | "Occupied" | "Maintenance";
