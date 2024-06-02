import express from 'express';

import { isAuthenticated, isOwner } from '../middleware/authHandler';
import { deleteUser, getUser, listUsers, updateUser } from '../controllers/users';

export default (router: express.Router) => {
    router.get('/api/users', isAuthenticated, listUsers);
    router.get('/api/users/:id', isAuthenticated, isOwner, getUser);
    router.delete('/api/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/api/users/:id', isAuthenticated, isOwner, updateUser);
};
