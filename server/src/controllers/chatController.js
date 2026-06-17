const prisma =
    require("../config/prisma");

const {
    askResume
} = require("../services/chatService");

const chatWithResume =
    async (req, res) => {

        try {

            const {
                resumeId,
                question
            } = req.body;

            const resume =
                await prisma.resume.findFirst({
                    where: {
                        id: resumeId,
                        userId:
                            req.user.userId
                    },
                    include: {
                        analysis: true
                    }
                });

            if (!resume) {

                return res.status(404)
                    .json({
                        success: false,
                        message:
                            "Resume not found"
                    });

            }

            const answer =
                await askResume(
                    resume.extractedText,
                    resume.analysis,
                    question
                );

            res.json({
                success: true,
                answer
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Server Error"
            });

        }

    };

module.exports = {
    chatWithResume
};