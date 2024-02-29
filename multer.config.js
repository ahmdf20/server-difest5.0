const express = require('express')
const multer = require('multer')
const router = express.Router()
// const upload = multer({ storage: storage })

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (request, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;