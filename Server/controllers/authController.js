import genToken from "../config/token.js";
import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs';


export const signUp = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existEmail = await User.findOne({email});
        if(existEmail) {
            return res.status(400).json({
                success: true,
                message: 'Email already exist!'
            });
        }

        if(password.length < 6) {
            return res.status(400).json({
                success: true,
                message: 'Password must be atleast of 6 characters!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name, email, password: hashedPassword
        });
    
        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(201).json({
            success: true,
            message: 'User Created Successfully!',
            user
        });


    } catch (error) {
        return res.status(500).json({
            message: `SignUp Error: ${error}`
        });
    }
};


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success: true,
                message: 'Email does not exist!'
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(400).json({
                success: true,
                message: 'Incorrect Password!'
            });
        }
    
        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({
            success: true,
            message: 'User Logged In Successfully!',
            user
        });


    } catch (error) {
        return res.status(500).json({
            message: `Login Error: ${error}`
        });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({
            success: true,
            message: 'User Logged Out Successfully!',
        });

    } catch (error) {
        return res.status(500).json({
            message: `Logout Error: ${error}`
        });
    }
};