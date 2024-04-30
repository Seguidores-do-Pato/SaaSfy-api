import { Request, Response, NextFunction } from 'express';
import { get, identity, merge } from 'lodash';
import { getUserBySessionToken } from '../db/actions/user-actions';

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as unknown as string;

        if (!currentUserId) {
            logging.error('FORBIDDEN');
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            logging.error('FORBIDDEN');
            return res.sendStatus(403);
        }

        next();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(403);
    }
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['USER-SESSION'];

        if (!sessionToken) {
            logging.error('FORBIDDEN');
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            logging.error('FORBIDDEN');
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(403);
    }
};
