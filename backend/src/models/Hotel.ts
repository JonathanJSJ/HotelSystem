import mongoose, { Schema } from "mongoose";
import { IHotel } from "../interfaces/IHotel.js";

const HotelSchema = new Schema<IHotel>({
  name: { type: String, required: true },
  localization: { type: String, required: true },
  rate: { type: Number, required: true, min: 0, max: 5 },
  image_url: { type: String, required: false, default: null },
});

const Hotel = mongoose.model<IHotel>("Hotel", HotelSchema);
export default Hotel;
