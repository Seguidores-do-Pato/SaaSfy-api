import express, { Request, Response } from 'express';
import { getAllProducts } from '../../db/actions/product-actions';

export const listProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json(products).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(500);
    }
};
