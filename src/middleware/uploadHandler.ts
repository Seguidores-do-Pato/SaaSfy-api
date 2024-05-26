import multer from 'multer';
import path from 'path';
import { createUploadDir } from '../helpers/createDir';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const uploadDir = createUploadDir();

        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });
