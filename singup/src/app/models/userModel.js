import { time } from "console";
import { verify } from "crypto";
import mongoose from   "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({

    username: {
        type: String, 
        required: [true, "Username is required"],
        unique: true},  

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true},

    password: {
        type: String,
        required: [true, "Password is required"]
         },

         isVerified: {
                type: Boolean,
                default: false
            },

            isAdmin: {
                type: Boolean,
                default: false
            },

            forgotPassword: {
                forgotPasswordToken: String,
                forgotPasswordTokenExpiry: Date,
                verifyToken: String, 
                verifyTokenExpiry: Date,
            }      

});

const User = mongoose.model.user || mongoose.model("users", userSchema);

export default User;