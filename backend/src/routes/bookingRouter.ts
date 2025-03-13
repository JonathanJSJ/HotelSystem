import { Router } from "express";
import { authCheck } from "../middlewares/authMiddleware.js";
import {
  deleteUserBooking,
  getRoomBookings,
  getUserBookings,
  postUserBooking,
} from "../controllers/bookingController.js";

const router = Router();

router.post("/", authCheck, postUserBooking);
router.get("/user", authCheck, getUserBookings);
router.get("/room/:id", getRoomBookings);
router.delete("/:id", authCheck, deleteUserBooking);

export default router;
