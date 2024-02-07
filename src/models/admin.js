import mongoose from "mongoose";

const adminModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = mongoose.models.admins || mongoose.model("admins", adminModel);

export default Admin;