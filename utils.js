import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,`${__dirname }/public/img`); // donde se van a guardar los archivos
//     },
//     filename: (req, file,cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`) // nombre de los archivos
//     }
// })

// const uploader = multer({
//     storage,
//     onError: (err,next) => {
//         console.log(err);
//         next();
//     }
// })

export {__dirname} ;