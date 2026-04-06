import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../configs/redis.config.js";

dotenv.config();
export const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
  });

  const sessionToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SESSION_EXPIRE_TIME,
  });

  return { accessToken, sessionToken };
};

//Store session token to Redis
export const storeSessionToken = async (userId, sessionToken) => {
  try {
    await redis.set(`sessionTokenFor:${userId}`, sessionToken, {
      ex: 3 * 24 * 60 * 60,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//Set the cookies for use
export const setCookies = (res, accessToken, sessionToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 60 * 1000,
  });

  res.cookie("sessionToken", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};
