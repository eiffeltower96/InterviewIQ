const express = require("express");

const protect =
require("../middleware/authMiddleware");

const {
    register,
    login,
    getCurrentUser,
    getProfileStats
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
    "/me",
    protect,
    getCurrentUser
);

router.get(
    "/stats",
    protect,
    getProfileStats
);

module.exports = router;