const util = require("util");
const mongoose = require('mongoose');
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: process.env.MONGODB_URI || 'mongodb://127.0.0.1/nagrik',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "video/mp4","video/mpeg","video/quicktime","video/ogg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-IncidentId-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "incidentVideos",
      filename: `${Date.now()}-IncidentId-${file.originalname}`
    };
  }
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;