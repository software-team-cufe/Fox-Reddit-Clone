import multer from 'multer';
import appError from '../../utils/appError';
import { Request } from 'express';

const storage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const valid = file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png';
  if (valid) {
    cb(null, valid);
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
