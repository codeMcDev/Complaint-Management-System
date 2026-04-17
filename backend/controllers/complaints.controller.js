import Complaint from "../models/complaint.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessKey,
  generateCaseNumber,
} from "../utils/helperFunctions.js";
import cloudinary from "../configs/cloudinary.config.js";

export const getAllComplaintsController = async (_, res) => {
  try {
    const complaints = (
      await Complaint.find({}).select("-accessKeyHash")
    ).reverse();

    if (!complaints || complaints.length === 0)
      return res.status(200).json({ message: "No complaints found" });
    return res.status(200).json(complaints);
  } catch (error) {
    console.error("Error in getAllComplaints controller - ", error.message);
    return res.status(500).json({
      message: "Error fetching complaints - Internal server error",
      error: error.message,
    });
  }
};

export const viewComplaintDetailsController = async (req, res) => {
  const { caseId } = req.params;
  try {
    const complaint = await Complaint.findOne({ caseId }).select(
      "-accessKeyHash",
    );

    if (!complaint)
      return res.status(404).json({ message: "Couldn't find the complaint" });

    return res.status(200).json(complaint);
  } catch (error) {
    console.error("Error in getAllComplaints controller - ", error.message);
    return res.status(500).json({
      message: "Error fetching complaints - Internal server error",
      error: error.message,
    });
  }
};

export const createComplaintController = async (req, res) => {
  //Get Uploaded files
  const evidence = req.files;

  //Destructure req body to only allow permitted fields
  const {
    reportingMode,
    reporterName,
    reporterEmail,
    category,
    incidentDate,
    title,
    description,
  } = req.body;

  //check if all required fields have been filled
  try {
    if (!reportingMode || !category || !title.trim() || !description.trim())
      return res.status(400).json({ message: "Missing required fields" });

    if (
      reportingMode === "identified" &&
      (!reporterName.trim() || !reporterEmail.trim())
    )
      return res.status(400).json({ message: "Missing required fields" });

    //Generate a case number
    const caseNumber = generateCaseNumber();

    //empty list to store attachments if any
    const attachments = [];

    if (Array.isArray(evidence) && evidence.length > 0) {
      const uploadPromises = evidence.map((file, index) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            {
              folder: "complaint-evidences",
              resource_type: "auto",
              public_id: `evidence-${caseNumber}-${index++}`,
            },
            (err, result) => {
              if (err) {
                console.error("Cloudinary upload error:", err);
                return reject(err);
              }
              resolve({
                filename: result.public_id,
                originalName: file.originalname,
                url: result.secure_url,
                mimeType: file.mimetype,
                size: file.size,
              });
            },
          );

          stream.end(file.buffer);
        });
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      attachments.push(...uploadedFiles);
    }

    const accessKey = generateAccessKey();

    //Hash accessKey
    const hashedKey = await bcrypt.hash(accessKey, 10);

    // Create a new complaint based on the req body
    const newComplaint = new Complaint({
      caseId: caseNumber,
      reporterName,
      reporterEmail,
      incidentDate,
      reportingMode,
      category,
      title,
      description,
      accessKeyHash: hashedKey,
      evidence: attachments,
    });

    await newComplaint.validate();

    const savedComplaint = await newComplaint.save();

    return res.status(201).json({
      message: "Complaint created successfully",
      complaint: {
        caseNumber: savedComplaint.caseId,
        reportingMode: savedComplaint.reportingMode,
        reporterName: savedComplaint.reporterName ?? null,
        reporterEmail: savedComplaint.reporterEmail ?? null,
        category: savedComplaint.category,
        accessKey,
        priority: savedComplaint.priority,
        submittedAt: savedComplaint.createdAt,
        evidence: savedComplaint.evidence,
        description: savedComplaint.description,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    console.error("Error in createComplaintController - ", error.message);
    return res.status(500).json({
      message: "Error creating complaint - Internal server error",
      error: error.message,
    });
  }
};

export const trackCaseStatusController = async (req, res) => {
  const { caseId, accessKey } = req.body;

  if (!caseId || !accessKey)
    return res.status(401).json({ message: "Required fields not provided" });

  try {
    const foundComplaint = await Complaint.findOne({ caseId });
    const hashedAccessKey = await Complaint.findOne({ caseId }).select(
      "accessKeyHash",
    );
    if (
      foundComplaint &&
      (await bcrypt.compare(accessKey, hashedAccessKey.accessKeyHash))
    ) {
      return res.status(200).json({
        trackedComplaint: {
          caseId: foundComplaint.caseId,
          reportMode: foundComplaint.reportingMode,
          reporter: foundComplaint.reporterName,
          contact: foundComplaint.reporterEmail,
          title: foundComplaint.title,
          description: foundComplaint.description,
          supportingDocs: [
            ...foundComplaint.evidence.map(
              (file) => file.filename.split("/")[1],
            ),
          ],
          createdAt: foundComplaint.createdAt,
          priority: foundComplaint.priority,
          status: foundComplaint.status,
          updatedAt: foundComplaint.updatedAt,
          lastActivity: foundComplaint.lastActivityAt,
        },
      });
    }
    return res.status(500).json({ message: "Invalid credentials provided" });
  } catch (error) {
    console.log("Error in track case status controller - ", error);
    return res
      .status(500)
      .json({ message: "Internal error occurred", error: error.message });
  }
};

export const updateComplaintController = async (req, res) => {
  const { id } = req.params;

  const { category, status, subcategory, priority, assignedInvestigator } =
    req.body;

  try {
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { caseId: id },
      { category, status, subcategory, priority, assignedInvestigator },
      { new: true, runValidators: true },
    );

    if (!updatedComplaint)
      return res.status(404).json({ message: "Complaint not found" });

    return res.status(201).json({
      message: "Complaint updated successfully",
      updatedComplaint: {
        category: updatedComplaint.category,
        status: updatedComplaint.status,
        priority: updatedComplaint.priority,
        assignedInvestigator: updatedComplaint.assignedInvestigator,
      },
    });
  } catch (error) {
    console.log("Error in update complaint controller");
    return res
      .status(500)
      .json({ message: "Internal error occurred", error: error.message });
  }
};

export const successPageController = async (req, res) => {
  const { id } = req.params;

  try {
  } catch (error) {}
};
