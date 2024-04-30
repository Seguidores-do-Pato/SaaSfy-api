import { Request, Response } from 'express';
import { getUserById, updateUserById } from '../../db/actions/user-actions';

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'No user found.' }).end();
        }

        Object.assign(user, req.body);

        await user?.save();

        return res.status(200).json(user).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(400);
    }
};
