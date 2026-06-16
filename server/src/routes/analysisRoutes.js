const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
    analyzeResume
} = require("../controllers/analysisController");

const router = express.Router();

router.post("/ats", protect, analyzeResume);

module.exports = router;