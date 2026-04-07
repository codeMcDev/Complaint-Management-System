import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.config.js";
import complaintsRoutes from "./routes/complaints.route.js";
import authRoutes from "./routes/auth.route.js";
import path from "path";

dotenv.config();

//Initialize the server
const server = express();

//Defining the PORT
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

//middlewares
server.use(express.json());

//Routes
server.use("/api/complaints", complaintsRoutes);
server.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "/frontend/dist")));

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//Start the server
connectDB().then(() => {
  server.listen(
    PORT,
    console.log(
      `server is connected and running on - http://localhost:${PORT}`,
    ),
  );
});
