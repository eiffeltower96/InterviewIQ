const evaluateAnswer =
async (
    question,
    answer,
    company,
    role
) => {

    return {

        score: 8,

        strengths: [
            "Good structure",
            "Clear explanation"
        ],

        improvements: [
            "Add more examples",
            "Be more concise"
        ],

        overallFeedback:
            "Strong answer overall."
    };

};

module.exports = {
    evaluateAnswer
};