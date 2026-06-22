const generateInterviewQuestions =
async (
    company,
    role,
    interviewType
) => {

    return {
        questions: [

            "Tell me about yourself.",

            "Explain a challenging project you worked on.",

            "What are the biggest challenges in modern frontend development?",

            "Describe a time you solved a difficult bug.",

            `Why do you want to join ${company} as a ${role}?`

        ]
    };

};

module.exports = {
    generateInterviewQuestions
};