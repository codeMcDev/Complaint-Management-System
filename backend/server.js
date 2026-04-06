import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.config.js";
import complaintsRoutes from "./routes/complaints.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

//Initialize the server
const server = express();

//Defining the PORT
const PORT = process.env.PORT || 5000;

//middlewares
server.use(express.json());

//Routes
server.use("/api/complaints", complaintsRoutes);
server.use("/api/auth", authRoutes);

//Start the server
connectDB().then(() => {
  server.listen(
    PORT,
    console.log(
      `server is connected and running on - http://localhost:${PORT}`,
    ),
  );
});
