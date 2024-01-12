const multer = require("multer");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const imagePath = `${req.body.employeeNumber}${file.originalname}`;
    req.body.imagePath = imagePath;
    req.body.imageMimetype = file.mimetype;
    cb(null, imagePath);
  },
});

const upload = multer({ storage });

const uploadImage = (req, res, next) => {
  upload.single("userImage")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "Error uploading image: MulterError",
        error: err.message,
      });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
    next();
  });
};

module.exports = { uploadImage };
//400-Bad Request
//500- Internal Server Error
