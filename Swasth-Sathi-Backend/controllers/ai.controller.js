const { GoogleAuth } = require("google-auth-library");

const auth = new GoogleAuth({
    keyFilename: "google-key.json",
    scopes: [
        "https://www.googleapis.com/auth/generative-language",
        "https://www.googleapis.com/auth/cloud-platform",
    ],
});


// Function to call Gemini API
async function callGeminiAPI(prompt) {
    try {
        const client = await auth.getClient();
        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

        const response = await client.request({
            url,
            method: "POST",
            data: {
                contents: [{ parts: [{ text: prompt }] }],
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}

module.exports.generateQuestions = async (req, res) => {
    try {
        const { symptoms } = req.body;
        const prompt = `A patient reports these symptoms: ${symptoms}. What are some relevant follow-up diagnostic questions to ask? Provide 5-7 questions.`;

        const response = await callGeminiAPI(prompt);
        const questions = response.candidates?.[0]?.content?.parts?.[0]?.text.split("\n").filter(q => q.trim()) || [];

        res.json({ questions });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate questions" });
    }
};

module.exports.generateReport = async (req, res) => {
    console.log("I m running. Generating report");
    try {
        const { symptoms,questions, answers } = req.body;
        const prompt = `A patient reported these symptoms: ${symptoms} and answered the ${questions} diagnostic questions: ${JSON.stringify(answers)}. Generate a detailed health report with possible conditions, advice, and recommendations in json format with the given keys : diagnosis,advice and recomnendation`;

        const response = await callGeminiAPI(prompt);
        const report = response.candidates?.[0]?.content?.parts?.[0]?.text || "No report generated.";
        console.log(report);
        res.json({ report });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate report" });
    }
};

