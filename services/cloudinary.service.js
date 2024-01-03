import { v2 as cloudinary } from 'cloudinary';
import { Buffer } from 'buffer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadBase64Image = async (base64Image) => {
  const imageBuffer = Buffer.from(base64Image, 'base64');
  const uploadResult = new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(error.message);
        }
        resolve(result.secure_url);
      })
      .end(imageBuffer);
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return uploadResult;
};
