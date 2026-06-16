const model = require("../config/gemini");

const generateATSAnalysis = async (resumeText,
    jobDescription) => {

    const prompt = `
You are an Applicant Tracking System (ATS) and technical recruiter.

Evaluate the resume against the provided job description.

Scoring Rubric:

Keyword Match: 30 points
Skills Match: 20 points
Experience Relevance: 20 points
Projects Relevance: 15 points
Education Relevance: 5 points
Formatting and Structure: 10 points

Rules:

- Compare the resume directly against the job description.
- Missing required technologies should reduce the score.
- Reward strong matching projects and experience.
- Be objective and consistent.
- ATS score must be between 0 and 100.
- Return ONLY valid JSON.
- No markdown.
- No explanation outside JSON.

Return:

{
  "atsScore": number,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "missingKeywords": []
}

Job Description:

${jobDescription || "No job description provided."}

Resume:

${resumeText}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const cleaned = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
const analysis = JSON.parse(cleaned);

console.log(analysis);

return analysis;
   
};

console.log("Calling Gemini...");
module.exports = {
    generateATSAnalysis
};