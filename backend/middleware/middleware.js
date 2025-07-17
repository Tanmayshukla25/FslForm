
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
console.log('file:',_filename);
console.log('dir:',_dirname);



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(_dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null,` ${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});
export default multer({
  storage,
  
  limits: {
    fileSize: 5 * 1024 * 1024, 
    files: 2 
  }
});