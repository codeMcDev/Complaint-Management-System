import express from "express";
import {
  getAllUsersController,
  getProfileController,
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

//Get all users
authRoutes.get("/", getAllUsersController);

//User Signup
authRoutes.post("/signup", signupController);

//User Login
authRoutes.post("/login", loginController);

//User Logout
authRoutes.post("/logout", logoutController);

//Get user Profile
authRoutes.get("/profile", getProfileController);

export default authRoutes;
