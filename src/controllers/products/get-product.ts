import express, { Request, Response } from 'express';
import { getProductById } from '../../db/actions/product-actions';

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const product = await getProductById(productId);
        return res.status(200).json(product).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(500);
    }
};
