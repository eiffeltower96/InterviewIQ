const express =
require("express");

const protect =
require("../middleware/authMiddleware");

const {
    getInterviewReport
} = require(
    "../controllers/interviewReportController"
);

const router =
express.Router();

router.get(
    "/:sessionId",
    protect,
    getInterviewReport
);

module.exports =
router;