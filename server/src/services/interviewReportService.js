const model =
require("../config/gemini");

const generateInterviewReport =
async (
    session
) => {

    const prompt = `
You are an expert interview coach.

Company:
${session.company}

Role:
${session.role}

Interview Results:

${session.answers.map(
(a,index)=>
`
Question ${index+1}

Score:
${a.score}

Feedback:
${JSON.stringify(a.feedback)}
`
).join("\n")}

Return ONLY JSON:

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "strongestArea": "",
  "weakestArea": "",
  "recommendedTopics": [
    "",
    "",
    ""
  ],
  "summary": ""
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

    return JSON.parse(
        cleaned
    );

};

module.exports = {
    generateInterviewReport
};