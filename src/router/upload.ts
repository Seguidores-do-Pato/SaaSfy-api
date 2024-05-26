import express from 'express';
import { uploadController } from '../controllers/upload';
import { upload } from '../middleware/uploadHandler';

export default (router: express.Router) => {
    router.post('/api/upload', upload.array('files'), uploadController);
};
