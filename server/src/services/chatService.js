const model = require("../config/gemini");

const askResume = async (
    resumeText,
    analysis,
    question
) => {

    const prompt = `
You are an expert recruiter, hiring manager,
career coach, and software engineer.

Resume:
${resumeText}

ATS Analysis:
${JSON.stringify(analysis)}

User Question:
${question}

Rules:

- The resume is the primary source of truth.
- ATS analysis is supporting context only.
- Think step-by-step before answering.
- Explain your reasoning.
- Do not blindly repeat ATS weaknesses.
- Give practical advice.
- Answer like an experienced mentor.
- If multiple answers are possible, choose the strongest and explain why.

Answer:
`;

    const result =
        await model.generateContent(
            prompt
        );

    return result.response
        .text()
        .trim();
};
const generateChatTitle =
async (question) => {

    const prompt = `
Generate a short title
for this career conversation.

Rules:
- Maximum 4 words
- No quotes
- No punctuation
- Professional

Question:
${question}
`;

    const result =
        await model.generateContent(
            prompt
        );

    return result.response
        .text()
        .trim();

};
module.exports = {
    askResume,
    generateChatTitle
};