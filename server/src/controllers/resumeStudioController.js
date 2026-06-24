const prisma =
require("../config/prisma");
const PDFDocument =
require("pdfkit");
const getResumeStudio =
async (req,res) => {

    console.log(
        "GET RESUME STUDIO HIT",
        req.params.id
    );

    try {

        const resume =
        await prisma.resume.findUnique({

            where:{
                id:req.params.id
            }

        });

        console.log(
            "RESUME:",
            resume
        );

        if(!resume){

            return res.status(404).json({

                success:false,
                message:"Resume not found"

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
const saveRewrittenResume =
async (req,res) => {

    try {

        const {
            rewrittenText
        } = req.body;

        const resume =
        await prisma.resume.update({

            where:{
                id:req.params.id
            },

            data:{
                extractedText:
                    rewrittenText
            }

        });

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
const downloadResume =
async (req,res) => {

    const resume =
    await prisma.resume.findUnique({

        where:{
            id:req.params.id
        }

    });

    const doc =
    new PDFDocument();

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=resume.pdf"
    );

    doc.pipe(res);

    doc.fontSize(12);

    doc.text(
        resume.extractedText
    );

    doc.end();

};
module.exports = {
  getResumeStudio,
    rewriteResumeStudio,
    saveRewrittenResume,
    downloadResume
};