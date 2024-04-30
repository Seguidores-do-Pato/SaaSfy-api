import { Request, Response } from 'express';
import { deleteUserById } from '../../db/actions/user-actions';

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.sendStatus(200);
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(400);
    }
};
