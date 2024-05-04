import express, { Request, Response } from 'express';
import { updateProductById } from '../../db/actions/product-actions';

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const product = await updateProductById(productId, req.body);
        return res.status(200).json(product).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(400);
    }
};
