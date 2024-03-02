const multer = require('multer');
const path =require('path');
const storage = multer.diskStorage({
    limits: { fileSize: 1 * 1024 * 1024 },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    // destination: function (req, file, cb) {
    //     cb(null, path.join(__dirname, '../../temp-images/'));
    // },
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         const err = new Error('Only .png, .jpg and .jpeg format allowed!')
    //         err.name = 'ExtensionError'
    //         return cb(err);
    //     }
    // },
})
const upload = multer({ storage: storage, });
module.exports = upload;




