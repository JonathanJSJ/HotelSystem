import express from "express";
import roomRouter from "./roomRouter.js";
import userRouter from "./userRouter.js";
import hotelRouter from "./hotelRouter.js"
import bookingRouter from "./bookingRouter.js"
import { logger } from "../middlewares/logger.js";

const router = express.Router();

router.use(logger);

router.use("/hotels", hotelRouter)
router.use("/rooms", roomRouter);
router.use("/bookings", bookingRouter)
router.use("/user", userRouter);

export default router;
