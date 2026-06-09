const express = require('express');
const protect = require('../middleware/authMiddleware');
const upload = require("../config/multer");
const {
    uploadResume
} = require('../controllers/resumeController');

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
module.exports = router;