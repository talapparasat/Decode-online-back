const multer = require('multer');
const storage = multer.memoryStorage();
const multerUpload = multer({storage: storage});

module.exports = multerUpload;

// const multer =  require('multer');
//
// const storageConfig = multer.diskStorage({
//
//     destination: (req, file, cb) =>{
//         cb(null, "uploads/sectionImage");
//     },
//     filename: (req, file, cb) =>{
//         let name = req.body.name;
//         console.log(req.body);
//
//         let i = file.originalname.lastIndexOf('.');
//         let ext = i ? file.originalname.substr(i + 1) : 'jpeg';
//         name = name.replace(new RegExp(" ", 'g'), "");
//         let filename = name + Date.now() + '.' + ext;
//         req.body.img = 'http://jsrush.decode.kz/sectionImage/' + filename;
//         cb(null, filename);
//     }
// });
//
//
// exports.upload = function (fieldName) {
//     return multer({storage:storageConfig}).single(fieldName);
// };
87471379622