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

const Admin = mongoose.models.admin || mongoose.model("admin", adminModel);

export default Admin;