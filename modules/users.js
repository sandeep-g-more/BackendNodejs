import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String
    },
    gender: {
        enum: ['male', 'female', 'other'],
        type: String,
        required: true
    }
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
// export const User = mongoose.model("user", userSchema)