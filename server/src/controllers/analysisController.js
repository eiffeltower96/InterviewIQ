const prisma = require("../config/prisma");
const {
    generateATSAnalysis
} = require("../services/analysisService");

const analyzeResume = async (req, res) => {

    try {

        const { resumeId } = req.body;
console.log("Finding resume...");
        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
                userId: req.user.userId
            }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const existingAnalysis =
            await prisma.resumeAnalysis.findUnique({
                where: {
                    resumeId
                }
            });

        if (existingAnalysis) {
            return res.status(200).json({
                success: true,
                analysis: existingAnalysis,
                cached: true
            });
        }

        const analysis =
            await generateATSAnalysis(
                resume.extractedText,
                resume.jobDescription
            );

        const savedAnalysis =
            await prisma.resumeAnalysis.create({
                data: {
                    atsScore: analysis.atsScore,
                    strengths: analysis.strengths,
                    weaknesses: analysis.weaknesses,
                    suggestions: analysis.suggestions,
                    missingKeywords: analysis.missingKeywords,
                    resumeId: resume.id
                }
            });

        res.status(200).json({
            success: true,
            analysis: savedAnalysis,
            cached: false
        });

    } catch (error) {

    console.error(error);

    try {

        const { resumeId } = req.body;

        await prisma.resumeAnalysis.deleteMany({
            where: {
                resumeId
            }
        });

        await prisma.resume.deleteMany({
            where: {
                id: resumeId,
                userId: req.user.userId
            }
        });

    } catch (cleanupError) {

        console.error(
            "Cleanup Error:",
            cleanupError
        );

    }

    res.status(500).json({
        success: false,
        message:
            "Analysis failed. Please try again."
    });

}

};

module.exports = {
    analyzeResume
};