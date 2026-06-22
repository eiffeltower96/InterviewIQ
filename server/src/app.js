const express = require("express");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");
const chatRoutes =
    require("./routes/chatRoutes");
const companyAnalysisRoutes =
require(
  "./routes/companyAnalysisRoutes"
);
const interviewRoutes =
require("./routes/interviewRoutes");
const cors = require("cors");

const app = express();
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://interview-iq-sandy.vercel.app"
        ]
    })
);
app.use(express.json());
const analysisRoutes =
    require("./routes/analysisRoutes");
app.use(
  "/api/company-analysis",
  companyAnalysisRoutes
);
app.use(
    "/api/analysis",
    analysisRoutes
);
app.use(
    "/api/chat",
    chatRoutes
);
app.use(
    "/api/interview",
    interviewRoutes
);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.get("/", (req, res) => {
    res.send("InterviewIQ API Running");
});
app.get("/api/profile", protect, (req, res) => {

    res.json({
        success: true,
        user: req.user
    });

});
const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});