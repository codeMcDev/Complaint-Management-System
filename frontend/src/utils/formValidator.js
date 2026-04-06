// validation/complaintValidation.js

const ALLOWED_EVIDENCE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function validateComplaintForm(formData) {
  const errors = {};

  const {
    reportingMode,
    reporterName,
    reporterEmail,
    category,
    incidentDate,
    title,
    description,
    evidence,
  } = formData;

  // --- reportingMode ---
  if (!reportingMode || !["anonymous", "identified"].includes(reportingMode)) {
    errors.reportingMode = "Please select a reporting mode.";
  }

  // --- title ---
  if (!title || !title.trim()) {
    errors.title = "Title is required.";
  } else if (title.trim().length < 5) {
    errors.title = "Title should be at least 5 characters.";
  }

  // --- description ---
  if (!description || !description.trim()) {
    errors.description = "Description is required.";
  } else if (description.trim().length < 20) {
    errors.description = "Description should be at least 20 characters.";
  }

  // --- category ---
  if (!category || !category.trim()) {
    errors.category = "Please select a category.";
  }

  // --- incident date ---
  if (!incidentDate) {
    errors.incidentDate = "Incident date is required.";
  } else {
    const date = new Date(incidentDate);
    const now = new Date();

    // clear time for comparison
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    if (isNaN(date.getTime())) {
      errors.incidentDate = "Invalid date selected.";
    } else if (date > now) {
      errors.incidentDate = "Incident date cannot be in the future.";
    }
  }

  // --- identified reporters must have name + email ---
  if (reportingMode === "identified") {
    if (!reporterName || !reporterName.trim()) {
      errors.reporterName = "Name is required for identified reports.";
    } else if (!/^[a-zA-Z\s]+$/.test(reporterName.trim())) {
      errors.reporterName = "Name should only contain letters and spaces.";
    }

    if (!reporterEmail || !reporterEmail.trim()) {
      errors.reporterEmail = "Email is required for identified reports.";
    } else {
      const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
      if (!emailRegex.test(reporterEmail.trim())) {
        errors.reporterEmail = "Please enter a valid email address.";
      }
    }
  }

  // --- evidence (optional, but if provided must respect type + size) ---
  if (Array.isArray(evidence) && evidence.length > 0) {
    const invalidFiles = [];

    evidence.forEach((file) => {
      if (!ALLOWED_EVIDENCE_TYPES.includes(file.type)) {
        invalidFiles.push(
          `${file.name} has an unsupported type (${file.type || "unknown"})`,
        );
      } else if (file.size > MAX_FILE_SIZE_BYTES) {
        invalidFiles.push(`${file.name} is larger than ${MAX_FILE_SIZE_MB}MB`);
      }
    });

    if (invalidFiles.length > 0) {
      errors.evidence = "Some files are invalid:\n" + invalidFiles.join("\n");
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
}
