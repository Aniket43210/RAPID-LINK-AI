require("dotenv").config();
const axios = require("axios");

async function analyzeSymptoms(symptoms) {
    const prompt = `A person reports symptoms: ${symptoms}. What could be the possible causes and first-aid steps?`;

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/google/flan-t5-large",
            { inputs: prompt },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data[0].generated_text.trim();
    } catch (error) {
        console.error("Error in AI symptom analysis:", error);
        return "AI is currently unavailable. Please try again later.";
    }
}

module.exports = analyzeSymptoms;
