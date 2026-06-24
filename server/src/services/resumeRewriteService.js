const model =
require("../config/gemini");

const rewriteResume =
async (resumeText) => {

    const prompt = `
You are an expert resume reviewer.

Improve this resume.

Requirements:

- Strong action verbs
- Quantify achievements
- ATS friendly
- Keep facts unchanged
- Improve wording only

Resume:

${resumeText}

Return only improved resume text.
`;

    const result =
    await model.generateContent(
        prompt
    );

    return result.response.text();

};

module.exports = {
    rewriteResume
};