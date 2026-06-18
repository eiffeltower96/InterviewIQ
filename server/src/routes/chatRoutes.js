const express =
    require("express");

const protect =
    require("../middleware/authMiddleware");

const {
    chatWithResume,
    createChat,
    getResumeChats,
    getChatMessages
} = require(
    "../controllers/chatController"
);

const router =
    express.Router();

router.post(
    "/create",
    protect,
    createChat
);

router.get(
    "/resume/:resumeId",
    protect,
    getResumeChats
);

router.get(
    "/:chatId",
    protect,
    getChatMessages
);

router.post(
    "/",
    protect,
    chatWithResume
);

module.exports = router;