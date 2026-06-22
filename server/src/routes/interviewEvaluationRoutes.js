const express =
require("express");

const protect =
require("../middleware/authMiddleware");

const {
    evaluateInterviewAnswer
} = require(
    "../controllers/interviewEvaluationController"
);

const router =
express.Router();

router.post(
    "/",
    protect,
    evaluateInterviewAnswer
);

module.exports =
router;