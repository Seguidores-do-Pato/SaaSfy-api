import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productSchema = new Schema(
    {
        _id: { type: String, default: uuidv4 },
        name: { type: String, required: true },
        version: { type: String, required: true },
        description: { type: String, required: true },
        owner: { type: String, ref: 'User', required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        images: [{ type: String }],
        available: { type: Boolean, default: true },
        features: [{ type: String }]
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model('Product', productSchema);
