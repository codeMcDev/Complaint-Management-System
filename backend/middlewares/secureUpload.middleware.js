import upload from "../configs/multer.config.js";

const secureUpload = (req, res, next) => {
  upload.array("evidence", 10)(req, res, (err) => {
    if (err) {
      console.log(err.message);

      // 1) File too large
      if (err.name === "MulterError" && err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({
          message: "File too large. Max size is 10MB per file.",
        });
      }

      if (err.message === "Unsupported file type") {
        return res
          .status(415)
          .json({ message: "Unsupported file type uploaded" });
      }

      return res
        .status(400)
        .json({ message: "File Upload error", error: err.message });
    }
    return next();
  });
};

export default secureUpload;
