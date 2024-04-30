import express from 'express';
import { signIn, signUp } from '../controllers/authentication';

export default (router: express.Router) => {
    router.post('/auth/sign-up', signUp);
    router.post('/auth/sign-in', signIn);
};
