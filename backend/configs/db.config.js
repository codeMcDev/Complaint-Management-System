import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connection Successful");
  } catch (error) {
    console.log("Error connecting to DB - ", error.message);
    throw new Error(error);
  }
};

export default connectDB;
