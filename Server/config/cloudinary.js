import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET,
    });

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);

        fs.unlinkSync(filePath);

        return uploadResult.secure_url;

    } catch (error) {
        fs.unlinkSync(filePath);
        return resizeBy.status(500).json({
            success :true,
            message: `Cloudinary Error: ${error}`
        });
    }
};

export default uploadOnCloudinary;