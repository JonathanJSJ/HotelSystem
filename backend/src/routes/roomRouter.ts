import express from "express";
import {
  postRoom,
  putRoom,
  deleteRoom,
  getHotelRooms,
} from "../controllers/roomsController.js";
import { validateRoom } from "../middlewares/validator.js";

const router = express.Router();

router.get("/hotel/:id", getHotelRooms);
router.post("/", validateRoom, postRoom);
router.put("/:id", validateRoom, putRoom);
router.delete("/:id", deleteRoom);

export default router;
