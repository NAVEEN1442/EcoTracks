import axios from "axios";

const OPENAI_API_KEY = "your-openai-api-key-here"; // 🔹 Replace with your actual OpenAI API key

export const fetchChatbotResponse = async (message) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        return "Oops! Something went wrong.";
    }
};
