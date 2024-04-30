import crypto from 'crypto';
import { SECRET } from '../config';
import { z } from 'zod';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};

export const signInValidator = z.object({
    email: z.string().email(),
    password: z.string()
});

export const SignUpValidator = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
    }),
    name: z.string().min(3)
});
