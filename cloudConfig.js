require("dotenv").config(); // Load environment variables
const cloudinary = require("cloudinary").v2; // Use v2 for Cloudinary
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Correct import

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer-Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_DEV", // Cloudinary folder name
    allowed_formats: ["png", "jpeg", "jpg"], // Specify allowed file types
  },
});

module.exports = {
  cloudinary,
  storage,
};
