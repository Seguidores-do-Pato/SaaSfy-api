import { Product } from '../models/products';

export const getAllProducts = () => Product.find();
export const getProductById = (id: string) => Product.findById(id);
export const createProduct = (values: Record<string, any>) => new Product(values).save().then((product) => product.toObject());
export const updateProductById = (id: string, values: Record<string, any>) => Product.findByIdAndUpdate(id, values);
export const deleteProductById = (id: string) => Product.findByIdAndDelete(id);
