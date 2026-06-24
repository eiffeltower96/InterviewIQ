const prisma =
require("../config/prisma");

const getResumeStudio =
async (req,res) => {

    try {

        const resume =
        await prisma.resume.findUnique({

            where:{
                id:req.params.id
            }

        });

        if(!resume){

            return res.status(404).json({

                success:false

            });

        }

        res.json({

            success:true,

            resume

        });

    } catch(error){

        console.error(error);

        res.status(500).json({

            success:false

        });

    }

};
const {
    rewriteResume
} = require(
    "../services/resumeRewriteService"
);

const rewriteResumeStudio =
async (req,res) => {

    try {

        const resume =
        await prisma.resume.findUnique({

            where:{
                id:req.params.id
            }

        });

        const rewritten =
        await rewriteResume(
            resume.extractedText
        );

        res.json({

            success:true,

            rewritten

        });

    } catch(error){

        console.error(error);

        res.status(500).json({

            success:false

        });

    }

};
module.exports = {
  getResumeStudio,
  rewriteResumeStudio
};