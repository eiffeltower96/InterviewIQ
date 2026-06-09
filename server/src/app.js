const express = require("express");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");
const app = express();
app.use(express.json());
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
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});