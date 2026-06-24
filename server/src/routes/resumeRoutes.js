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
const {
    getResumeStudio,
    rewriteResumeStudio
} = require(
    "../controllers/resumeStudioController"
);

const router = express.Router();
router.post(
    "/:id/rewrite",
    protect,
    rewriteResumeStudio
);
router.get(
    "/:id/studio",
    protect,
    getResumeStudio
);
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