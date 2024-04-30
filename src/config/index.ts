import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

export const PORT = Number(process.env.PORT) || 8000;
export const MONGO_CONNECTION = process.env.MONGO_CONNECTION_URL || '';
export const SECRET = process.env.SECRET || '';
