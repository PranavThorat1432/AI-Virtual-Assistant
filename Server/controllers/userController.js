import User from "../models/UserModel.js";
import uploadOnCloudinary from '../config/cloudinary.js'
import geminiResponse from "../gemini.js";
import moment from "moment/moment.js";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if(!user) {
            return res.status(404).json({
                success: true,
                message: 'User not found!'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: `Get-Current-User Error: ${erorr}`
        });
    }
};


export const updateAssistant = async (req, res) => {
    try {
        const {assistantName, imageUrl} = req.body;
        let assistantImage;
        if(req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path);

        } else {
            assistantImage = imageUrl;
        }

        const user = await User.findByIdAndUpdate(req.userId, {
            assistantName, assistantImage
        }, {new: true}).select('-password');

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: `Update Assistant Error: ${erorr}`
        });
    }
};


export const askToAssistant = async (req, res) => {
    try {
        const {command} = req.body;
        const user = await User.findById(req.userId);
        user.history.push(command);
        user.save();
        const userName = user.name;
        const assistantName = user.assistantName;
        const result = await geminiResponse(command, assistantName, userName);

        const jsonMatch = result.match(/{[\s\S]*}/);
        if(!jsonMatch) {
            return res.status(400).json({response: "Sorry, I can't understand!"});
        }

        const gemResult = JSON.parse(jsonMatch[0]);
        const type = gemResult.type;

        switch(type) {
            case 'get_date' : 
                return res.status(200).json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current Date is ${moment().format('YYYY-MM-DD')}`
                });

            case 'get_time' : 
                return res.status(200).json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current Time is ${moment().format('hh:mm:A')}`
                });

            case 'get_day' : 
                return res.status(200).json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Today is ${moment().format('dddd')}`
                });

            case 'get_month' : 
                return res.status(200).json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current Month is ${moment().format('MMMM')}`
                });

            case 'google_search':
            case 'youtube_search':
            case 'youtube_play':
            case 'general':
            case 'calculator_open':
            case 'instagram_open':
            case 'whatsapp_open':
            case 'weather_show':
                return res.status(200).json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response
                });

            default: 
                return res.status(400).json({response: "Sorry, I can't understand that command."});
        }

        

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: `Ask To Assistant Error: ${erorr}`
        });
    }
};