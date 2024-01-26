import mongoose from "mongoose";

const userModel = new mongoose.Schema({
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
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verification_code: {
        type: String,
        required: false
    },
    reset_password_token: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: false
    },
});

const User = mongoose.models.users || mongoose.model("users", userModel);

export default User;