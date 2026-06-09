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

        // Read uploaded PDF
        const pdfBuffer = fs.readFileSync(req.file.path);

        // Extract text from PDF
        const data = await pdfParse(pdfBuffer);

        // Save resume metadata + extracted text
        const resume = await prisma.resume.create({
            data: {
                filePath: req.file.path,
                extractedText: data.text,
                userId: req.user.userId
            }
        });

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
console.log(pdfParse);
module.exports = {
    uploadResume
};