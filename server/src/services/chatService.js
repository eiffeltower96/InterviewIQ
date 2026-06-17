const model = require("../config/gemini");

const askResume = async (
    resumeText,
    analysis,
    question
) => {

    const prompt = `
You are an expert recruiter, hiring manager,
and career coach.

Resume:
${resumeText}

ATS Analysis:
${JSON.stringify(analysis)}

The resume is the primary source of truth.
Use ATS analysis only as supporting context.
Do not blindly repeat ATS weaknesses.

User Question:
${question}

Rules:

- Answer only from the resume and ATS analysis.
- Be specific and actionable.
- If the user asks about strengths, focus on strengths.
- If the user asks about weaknesses, focus on weaknesses.
- If the user asks about interview preparation, provide practical advice.
- Do not invent experiences or skills not present in the resume.
- Keep the response under 250 words.

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

module.exports = {
    askResume
};