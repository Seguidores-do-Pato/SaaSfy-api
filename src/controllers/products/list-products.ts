import express, { Request, Response } from 'express';
import { getAllProducts } from '../../db/actions/product-actions';

export const listProducts = async (req: Request, res: Response) => {
    try {
        const { limit, owner } = req.query;

        if (limit) {
            const numLimit = parseInt(limit as string);

            if (!isNaN(numLimit)) {
                const products = await getAllProducts().limit(numLimit);
                return res.status(200).json(products);
            }
        }

        if (owner) {
            const products = await getAllProducts().where({ owner: owner });

            if (!products.length) {
                logging.warn('No products found with this ID');
                return res.sendStatus(404);
            }

            return res.status(200).json(products);
        }

        const products = await getAllProducts();
        return res.status(200).json(products).end();
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(500);
    }
};
