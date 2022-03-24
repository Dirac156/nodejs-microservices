const db = require('../database/models/');
const dotenv = require('dotenv');
const aws = require('aws-sdk');
var multer = require('multer')
var multerS3 = require('multer-s3')
dotenv.config();

const { File } = db;

const bucketName = 'dirac-fiona-achille-upload-files';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

class uploadController {
  //method to upload file and insert in the DB
  static async uploadMyFile(req, res) {

    console.log(req.file);

    if (!req.file) return res.send('Please upload a file');

    try {
      console.log(req.file);

      console.log(req.file.key);

      const Link = `https://your-bucket-name.s3-us-east-1.amazonaws.com/${req.file.key}`;

      req.on('data', async (data) => {
        const params = {
          Bucket: bucketName,
          Key: req.file.key,
          Body: data.toString(),
        };
        try {
          console.log(Bucket, Key);

          //Upload file to S3

          await s3.putObject(params).promise();
          console.log('File successfully added to the bucket');
          res.send({
            success: true,
            message: 'File was successfully uploaded!',
          });
        } catch (e) {
          console.log("Couldn't add file to bucket");
          console.log(e);
        }
      });

      //Insert file name and link in DB

      File.create({
        fileName: req.file.filename,
        fileLink: Link,
      });

      // Return error of success msg
    } catch (error) {
      console.log('ERROR', error);
      return res
        .status('500')
        .json({ errors: { error: 'Files not found', err: error.message } });
    }
  }

  //method to return files in the DB
  static async getFiles(req, res) {
    //Code to get all files from DB and return them

    const data = await File.FindAll();

    return data;
  }
}

module.exports = uploadController;
