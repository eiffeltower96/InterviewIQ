const prisma =
require("../config/prisma");

const {
    generateInterviewQuestions
} = require(
    "../services/interviewService"
);

const startInterview =
async (req, res) => {

    try {

        const {
            resumeId,
            company,
            role,
            interviewType
        } = req.body;

        const result =
            await generateInterviewQuestions(
                company,
                role,
                interviewType
            );

        const session =
            await prisma.interviewSession.create({
                data: {

                    company,
                    role,
                    interviewType,

                    questions:
                        result.questions,

                    resumeId

                }
            });

        res.json({
            success: true,
            session
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to start interview"
        });

    }

};

module.exports = {
    startInterview
};