import multer from 'multer';
import appError from '../../utils/appError';
import { Request } from 'express';
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    const error = new appError('Not an image! Please upload only images', 400);
    cb(error);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});
export default upload;
