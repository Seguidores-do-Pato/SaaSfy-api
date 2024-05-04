import { Request, Response } from 'express';
import { deleteProductById } from '../../db/actions/product-actions';

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const product = await deleteProductById(productId);

        return res.sendStatus(200);
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(500);
    }
};
