const db = require('../database/models/');
const dotenv = require('dotenv');
const aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
dotenv.config();

const { File } = db;

const bucketName = 'dirac-fiona-achille-upload-files';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Upload file to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const send2db = (filename, link) => {
  File.create({
    fileName: filename,
    fileLink: link,
  });
};

const getFiles = () => {
  const data = await File.FindAll();

  return data;
};

module.exports = { upload, send2db, getFiles };
