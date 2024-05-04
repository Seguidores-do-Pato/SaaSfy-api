import express, { Request, Response } from 'express';
import { createProduct } from '../../db/actions/product-actions';
import { getUserById } from '../../db/actions/user-actions';
import { z } from 'zod';

const dataValidation = z.object({
    name: z.string(),
    owner: z.string()
});

export const registerProduct = async (req: Request, res: Response) => {
    try {
        const { name, owner } = dataValidation.parse(req.body);

        const user = await getUserById(owner);

        if (!user) {
            logging.error('USER NOT FOUND');
            return res.sendStatus(400);
        }

        const newProduct = await createProduct({
            name,
            owner: user
        });

        return res.status(201).json(newProduct).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(400);
    }
};
