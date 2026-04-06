import express from "express";
import {
  createComplaintController,
  getAllComplaintsController,
  trackCaseStatusController,
  updateComplaintController,
} from "../controllers/complaints.controller.js";
import secureUpload from "../middlewares/secureUpload.middleware.js";

const complaintsRoutes = express.Router();

//Get all complaints
complaintsRoutes.get("/", getAllComplaintsController);

//Log a complaint
complaintsRoutes.post(
  "/create-complaint",
  secureUpload,
  createComplaintController,
);

//!Todo Admin View complaint details.
// complaintsRoutes.get(
//   "/complaint-details/:existingId",
//   viewComplaintDetailsController,
// );

//Success Page Complaint Details
// complaintsRoutes.get(
//   "/success-page/:newCaseId",
//   viewComplaintDetailsController,
// );

//Case Tracker Details
complaintsRoutes.post("/case-status", trackCaseStatusController);

//Update complaint
complaintsRoutes.put("/:id", updateComplaintController);

export default complaintsRoutes;
