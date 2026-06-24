const prisma =
require("../config/prisma");

const {
    generateInterviewQuestions
} = require(
    "../services/interviewService"
);

const {
    evaluateEntireInterview
} = require(
    "../services/interviewEvaluationService"
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

       const resume =
    await prisma.resume.findUnique({

        where: {
            id: resumeId
        }

    });

if (!resume) {

    return res.status(404).json({

        success: false,
        message: "Resume not found"

    });

}

const result =
    await generateInterviewQuestions(

        company,

        role,

        interviewType,

        resume.extractedText

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

const submitInterview =
async (req,res) => {

    try {

        const {
            sessionId,
            answers
        } = req.body;

        const session =
        await prisma.interviewSession.findUnique({

            where:{
                id:sessionId
            }

        });

        if(!session){

            return res.status(404).json({

                success:false,
                message:
                "Interview session not found"

            });

        }

        const report =
        await evaluateEntireInterview({

            company:
                session.company,

            role:
                session.role,

            questions:
                session.questions,

            answers

        });

        await prisma.interviewSession.update({

            where:{
                id:sessionId
            },

            data:{
                report
            }

        });

        res.json({

            success:true,
            report

        });

    } catch(error){

        console.error(error);

        res.status(500).json({

            success:false,
            message:
            "Failed to submit interview"

        });

    }

};

module.exports = {

    startInterview,
    submitInterview

};