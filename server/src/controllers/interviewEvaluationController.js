const prisma =
require("../config/prisma");

const {
    evaluateAnswer
} = require(
    "../services/interviewEvaluationService"
);

const evaluateInterviewAnswer =
async (req, res) => {

    try {

        const {
            sessionId,
            questionIndex,
            question,
            answer,
            company,
            role
        } = req.body;

        const result =
            await evaluateAnswer(
                question,
                answer,
                company,
                role
            );

        await prisma.interviewAnswer.create({

            data: {

                answer,

                score:
                    result.score,

                feedback: {
                    strengths:
                        result.strengths,

                    improvements:
                        result.improvements,

                    overallFeedback:
                        result.overallFeedback
                },

                questionIndex,

                sessionId

            }

        });

        res.json({

            success: true,

            evaluation:
                result

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false

        });

    }

};

module.exports = {
    evaluateInterviewAnswer
};