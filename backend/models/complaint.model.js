import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true }, // stored name
    originalName: { type: String }, // user-uploaded name
    url: { type: String, required: true }, // storage URL
    mimeType: { type: String },
    size: { type: Number }, // bytes
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null for anonymous reporter
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const InternalNoteSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const ComplaintSchema = new mongoose.Schema(
  {
    // Human-readable case ID, e.g. CMP-8821
    caseId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    // Reporter type: anonymous vs identified
    reportingMode: {
      type: String,
      enum: ["anonymous", "identified"],
      required: true,
      index: true,
    },

    // If identified, link to user (optional)
    reporterUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Snapshot of reporter info at the time of submission
    reporterName: String,
    reporterEmail: String,
    reporterDepartment: String,

    // Complaint categorization
    category: {
      type: String, // or ref: "ComplaintCategory" if you use separate collection
      required: true,
      index: true,
    },
    subcategory: String, // optional

    // Incident details
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    incidentDate: Date,
    incidentLocation: { type: String, default: "No Location Specified" },

    // Case workflow
    status: {
      type: String,
      enum: [
        "PENDING_REVIEW",
        "UNDER_REVIEW",
        "IN_PROGRESS",
        "RESOLVED",
        "CLOSED",
        "REJECTED",
      ],
      default: "PENDING_REVIEW",
      index: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
      index: true,
    },

    // Assignment
    assignedInvestigator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    // Evidence at case level (in addition to per-message attachments)
    evidence: [AttachmentSchema],

    // Internal notes (private to admins/investigators)
    internalNotes: [InternalNoteSchema],

    // Secure access for status tracker page:
    // hashedAccessKey is stored; raw access key is only shown once.
    accessKeyHash: {
      type: String,
      required: true,
      select: false, // don’t include in normal queries by default
    },

    // Derived stats / UX helpers
    lastActivityAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    messageCount: {
      type: Number,
      default: 0,
    },

    // For analytics cards on Dashboard
    // e.g. to compute effectiveness metrics
    resolvedAt: Date,
  },
  { timestamps: true },
);

// Useful index for registry listing & filters
ComplaintSchema.index({ status: 1, priority: 1, createdAt: -1 });

const Complaint = mongoose.model("Complaint", ComplaintSchema);

export default Complaint;
