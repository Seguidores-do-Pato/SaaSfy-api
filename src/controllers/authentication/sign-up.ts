import express, { Request, Response, NextFunction } from 'express';
import { SignUpValidator, authentication, random } from '../../helpers/authentication';
import { createUser, getUserByEmail } from '../../db/actions/user-actions';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, password } = SignUpValidator.parse(req.body);

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            logging.error('EMAIL ALREADY IN USE');
            return res.sendStatus(400);
        }

        const salt = random();

        const user = await createUser({
            email,
            name,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(201).json(user).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(500);
    }
};
