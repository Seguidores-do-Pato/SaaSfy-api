import mongoose, { Schema } from 'mongoose';
import cuid from 'cuid';

const userSchema = new Schema(
    {
        _id: { type: String, default: cuid },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phone: { type: String },
        authentication: {
            password: { type: String, required: true, select: false },
            salt: { type: String, select: false },
            sessionToken: { type: String, select: false }
        },
        social: {
            facebook: { type: String },
            twitter: { type: String },
            linkedin: { type: String },
            github: { type: String }
        },
        role: { type: String, enum: ['user', 'admin'], default: 'user' }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema);
