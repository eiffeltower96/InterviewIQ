const prisma =
require("../config/prisma");

const {
    generateInterviewReport
} = require(
    "../services/interviewReportService"
);

const getInterviewReport =
async (req,res) => {

    try {

        const session =
        await prisma.interviewSession.findUnique({

            where:{
                id:req.params.sessionId
            },

            include:{
                answers:true
            }

        });

        const report =
        await generateInterviewReport(
            session
        );

        await prisma.interviewSession.update({

            where:{
                id:session.id
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

            success:false

        });

    }

};

module.exports = {
    getInterviewReport
};