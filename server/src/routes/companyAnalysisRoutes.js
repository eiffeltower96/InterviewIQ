const express =
  require("express");

const protect =
  require("../middleware/authMiddleware");

const {
    analyzeCompany,
} = require(
    "../controllers/companyAnalysisController"
);

const router =
    express.Router();

router.post(
    "/",
    protect,
    analyzeCompany
);
router.get(
    "/test",
    (req, res) => {
        res.json({
            success: true,
            message: "Company route working"
        });
    }
);
module.exports =
    router;