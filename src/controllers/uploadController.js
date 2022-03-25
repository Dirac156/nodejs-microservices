const db = require('../database/models/');
const dotenv = require('dotenv');
const aws = require('aws-sdk');
const v4 = require('uuid').v4;
var multer = require('multer');
var multerS3 = require('multer-s3');
dotenv.config();

const { File } = db;

const bucketName = 'dirac-fiona-achille-upload-files-v2';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
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
      cb(null, `file_${v4()}`);
    },
  }),
});

const send2db = (filename, link) => {
  const file = File.build({
    fileName: filename,
    fileLink: link,
  });

  console.log(file);

  file.save()
};

const getFiles = async(req, res) => {
  try {
    const data = await File.findAll();
    res.status(200).json(data);
  }catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

module.exports = { upload, send2db, getFiles };
