import { Router } from "express";
import {
  deleteHotelById,
  getHotel,
  getHotelsPage,
  getHotelsWithFilters,
  postHotel,
  putHotel,
} from "../controllers/hotelController.js";

const router = Router();

router.post("/", postHotel);
router.get("/", getHotelsPage);
router.get("/search", getHotelsWithFilters);
router.get("/:id", getHotel);
router.put("/:id", putHotel);
router.delete("/:id", deleteHotelById);

export default router;
