const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    callback(null, filename + "-" + uniqueSuffix + ".png");
  },
});

exports.upload = multer({ storage: storage });
