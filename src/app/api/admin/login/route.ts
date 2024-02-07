import { NextRequest, NextResponse } from "next/server";
import Connection from "@/config/conn";
import Admin from "@/models/admin";
import jwt from "jsonwebtoken";

Connection();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { email, password } = req;

        const selectAdmin = await Admin.findOne({ email: email, password: password });

        if(!email || !password) {
            return NextResponse.json({ message: "All the fields are required" });
        }
        else if(!selectAdmin) {
            return NextResponse.json({ message: "Wrong Credentials" });
        }
        else {
            const adminToken = {
                _id: selectAdmin._id,
            }
            const token = jwt.sign(adminToken, "admin_token");
            
            const response = NextResponse.json({ message: "You have logged in successfully" });
            response.cookies.set("admin_token", token, { httpOnly: true });
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}