import express, { Request, Response, NextFunction } from 'express';

export const uploadController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.send(req.files);
    } catch (error: any) {
        logging.error(error.message);
        return res.sendStatus(401);
    }
};
