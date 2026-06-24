const express =
require("express");

const protect =
require("../middleware/authMiddleware");

const {
    startInterview,
    submitInterview
} = require(
    "../controllers/interviewController"
);

const router =
express.Router();

router.post(
    "/start",
    protect,
    startInterview
);
router.post(
    "/submit",
    protect,
    submitInterview
);
module.exports =
router;