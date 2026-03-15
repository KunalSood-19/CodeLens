const express = require("express");
const router = express.Router();

const { reviewCode, uploadCodeFile } = require("../controllers/reviewController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, path.join(__dirname, "..", "uploads"));
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + "-" + file.originalname);
 }
});

const upload = multer({ storage: storage });

router.post("/review", reviewCode);
router.post("/upload", upload.single("file"), uploadCodeFile);

module.exports = router;