const model =
require("../config/gemini");

const evaluateAnswer =
async (
    question,
    answer,
    company,
    role
) => {

    const prompt = `
You are a senior technical interviewer.

Company:
${company}

Role:
${role}

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON.

{
  "score": 0,
  "strengths": [
    ""
  ],
  "improvements": [
    ""
  ],
  "overallFeedback": ""
}

Rules:

- Score must be between 0 and 10.
- Give exactly 2 strengths.
- Give exactly 2 improvements.
- Feedback should be concise.
- Return only JSON.
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
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

    return JSON.parse(
        cleaned
    );

};

module.exports = {
    evaluateAnswer
};