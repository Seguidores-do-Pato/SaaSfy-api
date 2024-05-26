import express from 'express';
import { deleteProduct, listProducts, registerProduct, updateProduct } from '../controllers/products';
import { isAuthenticated, isOwner } from '../middleware/authHandler';

export default (router: express.Router) => {
    router.get('/api/product', listProducts);
    router.post('/api/product/create', isAuthenticated, registerProduct);
    router.patch('/api/product/:id/:productId', isAuthenticated, isOwner, updateProduct);
    router.delete('/api/product/:id/:productId', isAuthenticated, isOwner, deleteProduct);
};
