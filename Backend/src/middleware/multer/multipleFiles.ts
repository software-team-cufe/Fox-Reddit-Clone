import multer from 'multer';

const storage = multer.memoryStorage();
//multiple file uploads

const uploadMultiple = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } }).array('attachments', 10);

export default uploadMultiple;
//export default upload.array('attachments', 10);
