import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/posts/files');
  },
  filename: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      return cb(null, `${Date.now()}-${file.originalname}.jpg`);
    }

    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
//export default upload.array('attachments', 10);
