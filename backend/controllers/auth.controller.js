import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateTokens,
  setCookies,
  storeSessionToken,
} from "../utils/generateAndStoreTokens.js";
import jwt from "jsonwebtoken";
import { redis } from "../configs/redis.config.js";

export const getAllUsersController = () => {};

//* Signup Logic goes here
export const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  //Input validations
  if (!name.trim() || !/^[a-zA-Z ]+$/.test(name.trim()))
    return res
      .status(400)
      .json({ message: "Name should only contain letters and spaces" });

  if (!email.trim() || !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim()))
    return res
      .status(400)
      .json({ message: "Email field is empty or has invalid format" });

  if (
    !password.trim() ||
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!&*?&]{8,}$/.test(
      password.trim(),
    )
  )
    return res.status(400).json({
      message:
        "Password should contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters",
    });

  // Check if user already exist
  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res
        .status(400)
        .json({ message: "User already exist, try login instead" });

    //If not hash the new user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
    });

    //Validate user against the DB Model
    await newUser.validate();

    //Save user to DB
    const savedUser = await newUser.save();

    //Generate tokens for the users
    const { accessToken, sessionToken } = generateTokens(savedUser._id);

    //Storing the session token in redis
    await storeSessionToken(savedUser._id, sessionToken);

    //Parsing the cookies in the response
    setCookies(res, accessToken, sessionToken);

    return res.status(201).json({
      message: "User created successfully",
      user: { name: savedUser.name, email: savedUser.email },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal server error - ${error.message}` });
  }
};

//* Login Logic goes here
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  //Email Validation
  if (
    !email ||
    !email.trim() ||
    !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())
  )
    return res.status(400).json({ message: "Invalid email format" });

  if (!password)
    return res.status(400).json({ message: "Password is required" });

  try {
    const userFound = await User.findOne({ email });

    if (userFound && (await bcrypt.compare(password, userFound.passwordHash))) {
      //Set Cookies
      const { accessToken, sessionToken } = generateTokens(userFound._id);

      //Storing the session token in redis
      await storeSessionToken(userFound._id, sessionToken);

      //Parsing cookies in response
      setCookies(res, accessToken, sessionToken);

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: userFound._id,
          name: userFound.name,
          email: userFound.email,
          role: userFound.role,
          department: userFound.department,
          title: userFound.title,
        },
      });
    }

    return res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal server error - ${error.message}` });
  }
};

export const logoutController = async (req, res) => {
  try {
    const sessionToken = req.cookies.sessionToken;

    if (sessionToken) {
      const decodedSessionToken = jwt.verify(
        sessionToken,
        process.env.JWT_SECRET,
      );
      await redis.del(`sessionTokenFor:${decodedSessionToken.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("sessionToken");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller");
    res
      .status(500)
      .json({ message: `Internal server error - ${error.message}` });
  }
};

export const getProfileController = (req, res) => {
  try {
  } catch (error) {}
};
