const multer = require('multer');
const path = require('path');

//Disk for save file
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

//Limit filesize
const limits = {
  fileSize: 10_000_000,
};

const upload = multer({
  storage,
  limits,
});

const uploadMiddleware = (req, res, next) => {
  const singleUpload = upload.single('image');
  singleUpload(req, res, (err) => {
    if (err) {
      res.json({
        success: false,
        error: err,
      });
    } else if (!req.file) {
      res.json({
        success: false,
        error: 'File not found',
      });
    } else {
      next();
    }
  });
};
module.exports = uploadMiddleware;
