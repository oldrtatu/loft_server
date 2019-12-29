const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const appRoot = require("app-root-path");
const model = require('./../models/')

const uploadPath = appRoot + "/uploads/";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage: storage });

// get a file
router.get("/", async (req, res, next) => {
  res.sendStatus(403);
});

// upload a file
router.post("/", upload.single("file"), async (req, res, next) => {	
  res.status(200).json({
		url: '/attachment/' + req.file.filename
	});
});




router.get("/:fileName", async (req, res, next) => {

  // file path
  let filePath = __basedir + "/uploads" + req.url;
  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: "File Not Found"
        })
      );
      return;
    }
    res.writeHead(200);
    res.end(data);
  });


});

module.exports = router;
