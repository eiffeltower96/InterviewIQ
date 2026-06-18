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
    question,
    chatId
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
if (chatId) {

    await prisma.chatMessage.create({
        data: {
            chatId,
            role: "user",
            content: question
        }
    });

}
            const answer =
                await askResume(
                    resume.extractedText,
                    resume.analysis,
                    question
                );
if (chatId) {

    await prisma.chatMessage.create({
        data: {
            chatId,
            role: "assistant",
            content: answer
        }
    });

}
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
const createChat = async (req, res) => {

    try {

        const { resumeId } = req.body;

        const resume =
            await prisma.resume.findFirst({
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

        const chat =
            await prisma.chat.create({
                data: {
                    title: "New Chat",
                    resumeId
                }
            });

        res.status(201).json({
            success: true,
            chat
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};
const getResumeChats = async (req, res) => {

    try {

        const { resumeId } =
            req.params;

        const chats =
            await prisma.chat.findMany({
                where: {
                    resumeId
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

        res.json({
            success: true,
            chats
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};
const getChatMessages =
    async (req, res) => {

        try {

            const { chatId } =
                req.params;

            const messages =
                await prisma.chatMessage.findMany({
                    where: {
                        chatId
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                });

            res.json({
                success: true,
                messages
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: "Server Error"
            });

        }

    };
module.exports = {
    chatWithResume,
    createChat,
    getResumeChats,
    getChatMessages
};