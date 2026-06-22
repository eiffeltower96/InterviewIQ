const express =
require("express");

const protect =
require("../middleware/authMiddleware");

const {
    startInterview
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

module.exports =
router;