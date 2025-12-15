import axios from 'axios';

const geminiResponse = async (command, assistantName, userName) => {
    try {
        const api_url = process.env.GEMINI_API_URL;
        if (!api_url) {
            throw new Error('GEMINI_API_URL is not configured');
        }

        const prompt = `You are a voice-enabled virtual assistant named "${assistantName}", created by "${userName}".  
        You must always respond ONLY in a JSON object (no extra text, no markdown).

        Your job:
        - Understand the user's natural language (any language: Hindi, English, Marathi, etc.)
        - Classify the intent.
        - Reply in the SAME LANGUAGE the user used.

        Return the response in this JSON format:

        {
        "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "whatsapp_open" | "weather_show",
        "userInput": "<cleaned user input without assistant name>",
        "response": "<short spoken reply in the SAME language as user>"
        }

        RULES

        1. Intent detection
        (same rules as before — no changes)

        2. userInput field
        - Must contain ONLY the user's cleaned request.
        - Remove mentions of assistant name.
        - For Google/Youtube searches → include ONLY the search terms.

        3. response field
        - MUST be in the SAME LANGUAGE used by the user.
        - Must be short, natural, and voice-friendly.

        4. About creator
        - If user asks “who made you”, reply with: "${userName}"

        5. Output rule
        - Return ONLY the JSON object.
        - No extra text, no quotes outside JSON, no formatting.

        Now process this user input: "${command}"`;
        

        const result = await axios.post(api_url, {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        });

        const candidate = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!candidate) {
            throw new Error('Empty response from Gemini');
        }
        return candidate;
        
    } catch (error) {
        console.error('geminiResponse error:', error?.response?.data || error.message || error);
        return null;
    }
};

export default geminiResponse;