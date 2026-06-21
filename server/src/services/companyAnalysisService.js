const model =
  require("../config/gemini");

const analyzeDreamCompany =
async (
    resumeText,
    company,
    role
) => {

    const prompt = `
You are a senior recruiter,
hiring manager,
career coach,
and industry expert.

Analyze this candidate's resume
for the following role.

Company:
${company}

Role:
${role}

Resume:
${resumeText}

Return ONLY valid JSON.

{
  "overallScore": number,
  "shortlistChance": number,
  "profileStrength": number,
  "competitionLevel": string,

  "categoryScores": {
    "technicalSkills": number,
    "projects": number,
    "experience": number,
    "dsa": number,
    "communication": number
  },

  "strengths": [
    ""
  ],

  "missingSkills": [
    ""
  ],

  "focusAreas": [
    ""
  ],

  "verdict": "",

  "roadmap": [
    ""
  ]
}

Rules:

- Scores must be 0-100.
- Be realistic.
- Use company standards.
- Consider competition.
- Give exactly 3 strengths.
- Give exactly 3 missing skills.
- Give exactly 3 focus areas.
- Give exactly 4 roadmap items.
- Verdict should be 3-5 sentences.
- Return ONLY JSON.
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

console.log(cleaned);

return JSON.parse(cleaned);

};

module.exports = {
    analyzeDreamCompany
};