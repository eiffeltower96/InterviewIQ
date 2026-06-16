const fs = require("fs");
const pdfParse = require("pdf-parse");
const prisma = require("../config/prisma");

const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
        const { jobDescription } = req.body;
        // Read uploaded PDF
        const pdfBuffer = fs.readFileSync(req.file.path);

        // Extract text from PDF
        const data = await pdfParse(pdfBuffer);
console.log("Creating resume...");
console.log(req.body);
console.log(req.user);
        // Save resume metadata + extracted text
        const resume = await prisma.resume.create({
            data: {
                filePath: req.file.path,
                extractedText: data.text,
                 jobDescription,
                userId: req.user.userId
            }
        });
console.log("Resume created successfully");
        res.status(201).json({
            success: true,
            message: "Resume uploaded and parsed successfully",
            resumeId: resume.id,
            extractedLength: data.text.length
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const getProfileResumes = async (
    req,
    res
) => {

    try {

        const resumes =
            await prisma.resume.findMany({
                where: {
                    userId:
                        req.user.userId
                },
                include: {
                    analysis: true
                },
                orderBy: {
                    uploadedAt: "desc"
                }
            });

        res.json({
            success: true,
            resumes
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};
const getUserResumes = async (req, res) => {
    try {

        const resumes = await prisma.resume.findMany({
            where: {
                userId: req.user.userId
            },
            include: {
                analysis: true
            },
            orderBy: {
                uploadedAt: "desc"
            }
        });

        const response = resumes.map((resume) => ({
            id: resume.id,
            uploadedAt: resume.uploadedAt,
            hasAnalysis: !!resume.analysis,
            atsScore: resume.analysis?.atsScore || null
        }));

        res.status(200).json({
            success: true,
            resumes: response
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};
const getResumeById = async (req, res) => {

    try {

        const resume = await prisma.resume.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.userId
            },
            include: {
                analysis: true
            }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.status(200).json({
            success: true,
            resume
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
    
}
const deleteResume = async (
        req,
        res
    ) => {

        try {

            const { id } = req.params;

            const resume =
                await prisma.resume.findUnique({
                    where: {
                        id
                    }
                });

            if (!resume) {

                return res.status(404).json({
                    success: false,
                    message: "Resume not found"
                });

            }

            await prisma.resumeAnalysis.deleteMany({
                where: {
                    resumeId: id
                }
            });

            await prisma.resume.delete({
                where: {
                    id
                }
            });

            res.json({
                success: true,
                message: "Resume deleted"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message: "Server Error"
            });

        }

    };
module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
    deleteResume,
    getProfileResumes
};