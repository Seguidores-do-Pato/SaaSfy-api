import express, { Request, Response, NextFunction } from 'express';
import { authentication, random, signInValidator } from '../../helpers/authentication';
import { getUserByEmail } from '../../db/actions/user-actions';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = signInValidator.parse(req.body);

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            logging.error('USER NOT FOUND');
            return res.sendStatus(400);
        }
        // @ts-expect-error
        const expectedHash = authentication(user?.authentication?.salt, password);

        if (user?.authentication?.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('USER-SESSION', user.authentication.sessionToken, { domain: 'localhost', path: '/', httpOnly: true });

        const responseUser = { ...user.toJSON(), authentication: undefined };

        return res.status(200).json(responseUser).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(500);
    }
};
