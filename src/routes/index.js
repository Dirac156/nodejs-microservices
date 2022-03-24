const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
dotenv.config();
const uploadController = require('../controllers/uploadController');


router.get('/', (_, res) => res.send('Welcome to S3 File Uploader'));

router.post('/upload', uploadController.upload.single('file'), function (req, res, next) {
    console.log(req.file);
    uploadController.send2db(req.file.filename,req.file.location )
    res.send('Uploaded the file to the s3 bucket!');
});

router.get('/files/', uploadController.getFiles);

module.exports = router;
