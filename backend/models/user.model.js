import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      //sparse: true, // This is to allow null if some users are created without email
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    department: {
      type: String, // e.g. "Engineering", "Finance"
      trim: true,
    },
    title: {
      type: String, // e.g. "Senior Compliance Officer"
      trim: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "INVESTIGATOR", "REVIEWER", "PORTAL_USER"],
      default: "PORTAL_USER",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", UserSchema);
