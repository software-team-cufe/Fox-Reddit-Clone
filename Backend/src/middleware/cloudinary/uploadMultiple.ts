import express from 'express';
import multer, { Multer } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import asyncHandler from 'express-async-handler';

cloudinary.config({
  cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.APP_CLOUDINARY_API_KEY,
  api_secret: process.env.APP_CLOUDINARY_API_SECRET,
});

const uploadSingleCloudinary = asyncHandler(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const image = req.file as Express.Multer.File;
      if (!image) {
        throw new Error('No image file provided');
      }
      const b64 = Buffer.from(image.buffer).toString('base64');
      const dataURI = 'data:' + image.mimetype + ';base64,' + b64;
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
      });
      res.locals.image = result.secure_url;
      next();
    } catch (error) {
      res.status(500).json({
        msg: 'Internal error at uploading single media',
      });
    }
  }
);

const uploadMultipleCloudinary = asyncHandler(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      console.log('req.file', req.file);
      console.log('req.files', req.files);
      const images = req.files as Express.Multer.File[];
      console.log(images); //debug
      const imageUrls = [];

      if (images) {
        for (const image of images) {
          const b64 = Buffer.from(image.buffer).toString('base64');
          const dataURI = 'data:' + image.mimetype + ';base64,' + b64;
          const result = await cloudinary.uploader.upload(dataURI, {
            resource_type: 'auto',
          });

          imageUrls.push(result.secure_url);
        }
      }

      res.locals.images = imageUrls;
      console.log(res.locals.images); //debug
      next();
      //continue to the next logic piece or controller
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: 'Internal error at uploading multiple media',
      });
    }
  }
);

export { uploadSingleCloudinary, uploadMultipleCloudinary };
