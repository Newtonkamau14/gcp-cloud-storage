const multer = require("multer");

//10MB
let maxSize = 10000000;

//upload parameters
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

module.exports = { upload };
