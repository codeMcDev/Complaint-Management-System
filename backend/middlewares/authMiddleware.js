import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();
export const protectRoute = async (req, res, next) => {
  try {
    //Check the cookies for valid access token.
    const accessToken = req.cookies.accessToken;

    //if no access return a unauthorized message
    if (!accessToken)
      return res.status(401).json({ message: "Unauthorized, please sign in" });

    // if token is available and active, try decoding to find the active user
    try {
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);

      //fetch the active user details from DB
      const activeUser = await User.findById(decodedToken.userId).select(
        "-passwordHash",
      );

      //In case no activeUser is found
      if (!activeUser)
        return res
          .status(401)
          .json({ message: "User Not found, please login again" });

      //If user is found we put the user in the request
      req.user = activeUser;

      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError")
        return res
          .status(401)
          .json({ message: "Unauthorized, access token expired" });

      throw error;
    }
  } catch (error) {
    console.log("Error in authMiddleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") return next();
  return res.status(401).json({ message: "Denied - Admin access only" });
};
