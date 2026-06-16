const express = require('express');
const protect = require('../middleware/authMiddleware');
const upload = require("../config/multer");
const {
    uploadResume,
    getUserResumes,
    getResumeById,
    deleteResume,
    getProfileResumes
} = require('../controllers/resumeController');

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get("/", protect, getUserResumes);
router.get("/history",
    protect,
    getProfileResumes
);
router.get("/:id", protect, getResumeById);
router.delete(
    "/:id",
    protect,
    deleteResume
);
module.exports = router;