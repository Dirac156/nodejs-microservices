const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
dotenv.config();
const uploadController = require('../controllers/uploadController');


router.get('/', (_, res) => res.send('Welcome to S3 File Uploader'));

router.post('/upload', uploadController.upload.single('myFile'), function (req, res, next) {
    try {
        uploadController.send2db(req.file.originalname, req.file.location );
        const status = {
            uploadToS3: true,
            uploadToDb: true,
        }
        res.status(200).json(status);
    } catch(err) {
        res.status(500).end();
    }
});

router.get('/files/', uploadController.getFiles);

module.exports = router;
