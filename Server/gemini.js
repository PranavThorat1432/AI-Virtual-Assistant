import axios from 'axios';

const geminiResponse = async (command, assistantName, userName) => {
    try {
        const api_url = process.env.GEMINI_API_URL;

        // const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
        // You are not Google. You will now behave like a voice-enabled assistant. 
        
        // Your task is to understand the user's natural language input and respond with a JSON objects like this.
        
        // {
        //     "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "whatsapp_open" | "weather_show",
        //     "userinput: "<original user input>" {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userinput me only to search wala text jaye,
        //     "response": "<a short spoken response to read out loud to the user>"
        // }
        
        // Instrcutions: 
        // - " type": determine the intent of the user.
        // - "userinput": original sentence the user spoke.
        // - "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is tuesday", etc.

        // Type meanings:
        // - "general": if it's a factual or informational question.
        // - "google_search": if user wants to search something on Google.
        // - "youtube_search": if user wants to search something on YouTube.
        // - "youtube_play": if user wants to directly play a video or song.
        // - "calculator_open": if user wants to open calculator.
        // - "instagram_open": if user wants to open instagram.
        // - "whatsapp_open": if user wants to open whatsapp.
        // - "weather_show": if user wants to know weather.
        // - "get_time": if user asks for current time.
        // - "get_date": if user asks for today's date.
        // - "get_day": if user asks for day it is.
        // - "get_month": if user asks for the current month.

        // Important:
        // - Use "{author name}" agar koi puche tume kisne banaya
        // - Only respond with the JSON object, nothing else.

        // now your userInput - ${command} 
        // `;

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

        return result.data.candidates[0].content.parts[0].text;
        
    } catch (error) {
        console.log(error);
    }
};

export default geminiResponse;