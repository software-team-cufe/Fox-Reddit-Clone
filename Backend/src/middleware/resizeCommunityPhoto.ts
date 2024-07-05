import express from 'express';
import sharp from 'sharp';
import asyncHandler from 'express-async-handler';

const resizeCommunityIcon = asyncHandler(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const image = req.file as Express.Multer.File;

    console.log('resiza sTartimage', image);
    if (!image) {
      console.log('No file received');
      return next();
    }

    // console.log('Resizing user icon...');
    image.filename = `community-icon-${req.params.subreddit}-${Date.now()}.jpg`;

    await sharp(image.buffer).resize(500, 500).toFormat('jpg');

    //  console.log('Resized user icon');
    next();
  }
);

const resizeCommunityBanner = asyncHandler(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const image = req.file as Express.Multer.File;

    console.log('resiza sTartimage', image);
    if (!image) {
      console.log('No file received');
      return next();
    }

    // console.log('Resizing user icon...');
    image.filename = `community-icon-${req.params.subreddit}-${Date.now()}.jpg`;

    await sharp(image.buffer).resize(2000, 500).toFormat('jpg');

    //  console.log('Resized user icon');
    next();
  }
);

export { resizeCommunityIcon, resizeCommunityBanner };
