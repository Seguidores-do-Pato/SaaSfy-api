import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

export const PORT = Number(process.env.PORT) || 8000;
