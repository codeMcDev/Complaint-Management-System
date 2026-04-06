import multer from "multer";

//Storing the file buffer in memory to later upload to cloudinary
const storage = multer.memoryStorage();

//Setting the type of files that are allowed
const allowedTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

//Restricting upload to only allowed types
const fileFilter = (_, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else cb(new Error("Unsupported file type"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;
