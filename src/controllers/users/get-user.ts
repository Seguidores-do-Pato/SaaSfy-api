import { Request, Response } from 'express';
import { getUserById } from '../../db/actions/user-actions';

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);
        return res.status(200).json(user).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(400);
    }
};
