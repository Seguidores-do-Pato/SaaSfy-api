import express from 'express';
import authentication from './authentication';
import users from './users';
import product from './product';
import upload from './upload';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    product(router);
    upload(router);
    return router;
};
