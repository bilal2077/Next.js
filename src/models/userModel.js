import { verify } from 'crypto';
import mongoose from 'mongoose';
import { type } from 'os';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Username is required"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,

})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;