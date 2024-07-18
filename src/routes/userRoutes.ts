import {
  createUser,
  generateAccessToken,
  loginUser,
  userDetails,
  validateToken,
} from "../controller/userController";
import express from "express";
import authenticateToken from "../middlewares/auth";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/login", loginUser);
router.get("/validate-token", validateToken);
router.post("/generateAccessToken", generateAccessToken);
router.get("/user-details", authenticateToken, userDetails);

export default router;
