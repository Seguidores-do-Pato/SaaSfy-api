import { Request, Response } from 'express';
import { getAllUsers } from '../../db/actions/user-actions';

export const listUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(400);
    }
};
