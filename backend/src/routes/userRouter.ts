import express from "express";
import { postLogin, postUser, putUser } from "../controllers/userController.js";
import { authCheck } from "../middlewares/authMiddleware.js";
import { deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", postUser);
router.post("/login", postLogin);
router.put("/update", authCheck, putUser);
router.delete("/delete", authCheck, deleteUser);

export default router;
