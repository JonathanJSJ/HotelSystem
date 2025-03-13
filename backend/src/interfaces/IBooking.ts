import { ObjectId } from "mongoose";

export interface IBooking {
  client_first_name: String;
  client_last_name: String;
  client_phone_number: String;
  user_id: ObjectId;
  room_id: ObjectId;
  start_date: Date;
  end_date: Date;
}
