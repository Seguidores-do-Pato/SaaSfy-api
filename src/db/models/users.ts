import mongoose, { Schema } from 'mongoose';
import cuid from 'cuid';

const userSchema = new Schema(
    {
        _id: { type: String, default: cuid },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        authentication: {
            password: { type: String, required: true, select: false },
            salt: { type: String, select: false },
            sessionToken: { type: String, select: false }
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema);
