import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productSchema = new Schema(
    {
        _id: { type: String, default: uuidv4 },
        name: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model('Product', productSchema);
