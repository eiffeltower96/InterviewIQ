const express =
    require("express");

const protect =
    require("../middleware/authMiddleware");

const {
    chatWithResume
} = require(
    "../controllers/chatController"
);

const router =
    express.Router();

router.post(
    "/",
    protect,
    chatWithResume
);

module.exports = router;