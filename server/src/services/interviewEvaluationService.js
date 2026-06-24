const model =
require("../config/gemini");

const evaluateEntireInterview =
async ({
    company,
    role,
    questions,
    answers
}) => {

    const prompt = `
You are a senior interviewer.

Company:
${company}

Role:
${role}

Evaluate this entire interview.

${questions.map(
(question,index)=>`

Question ${index+1}:
${question}

Answer:
${answers[index]?.answer || ""}
`
).join("\n")}

Return ONLY JSON.

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,

  "questionEvaluations":[
    {
      "questionNumber":1,
      "score":0,
      "feedback":""
    }
  ],

  "strongestArea":"",
  "weakestArea":"",

  "recommendedTopics":[
    "",
    "",
    ""
  ],

  "summary":""
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
    evaluateEntireInterview
};