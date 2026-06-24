const model =
require("../config/gemini");

const generateInterviewQuestions =
async (
    company,
    role,
    interviewType,
    resumeText
) => {

    const prompt = `
You are a senior interviewer at ${company}.

Candidate Resume:

${resumeText}

Role:
${role}

Interview Type:
${interviewType}

Generate EXACTLY 15 unique interview questions.

Requirements:

- Tailor questions to the candidate's resume.
- Tailor questions to projects.
- Tailor questions to technologies.
- Include:
  Technical Questions
  Behavioral Questions
  Project Deep Dive Questions
  System Design Questions
  Company Specific Questions

Avoid generic questions like:
- Tell me about yourself
- Why do you want to join

unless absolutely necessary.

Return ONLY JSON.

{
  "questions":[
    ""
  ]
}
`;

    const result =
        await model.generateContent(
            prompt
        );

    const text =
        result.response
            .text()
            .trim();

    const cleaned =
        text
            .replace(/```json/g,"")
            .replace(/```/g,"")
            .trim();

    const parsed =
        JSON.parse(
            cleaned
        );

    const selectedQuestions =

        parsed.questions
            .sort(
                () =>
                Math.random() - 0.5
            )
            .slice(0,5);

    return {

        questions:
            selectedQuestions

    };

};

module.exports = {
    generateInterviewQuestions
};